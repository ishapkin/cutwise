<template>
  <!-- Page Content -->
  <div id="product" class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page"><router-link to="/">Home</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ diamond.sku }}</li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-md-4">
        <div v-if="!iframe.loaded" id="loader"></div>
        <iframe
                name="Cutwise Player"
                width="320"
                height="320"
                frameborder="0"
                sandbox="allow-same-origin allow-scripts allow-orientation-lock allow-pointer-lock allow-presentation"
                :src="iframe.src"
                @load="loaded()"
                v-show="iframe.loaded"
                allowfullscreen
        ></iframe>
      </div>
      <div class="col-md-8">
        <h1>{{ diamond.sku }}</h1>
        <table class="table">
          <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>isPublished</td>
              <td>{{ diamond.isPublished ? 'true' : 'false' }}</td>
            </tr>
            <tr v-if="diamond.cutShape">
              <td>cutShape</td>
              <td>{{ getDict('cutShape', diamond.cutShape) }}</td>
            </tr>
            <tr v-if="diamond.carat">
              <td>carat</td>
              <td>{{ diamond.carat }}</td>
            </tr>
            <tr v-if="diamond.clarity">
              <td>clarity</td>
              <td>{{ getDict('clarity', diamond.clarity) }}</td>
            </tr>
            <tr v-if="diamond.color">
              <td>color</td>
              <td>{{ getDict('color', diamond.color) }}</td>
            </tr>
            <tr v-if="diamond.cutQuality">
              <td>cutQuality</td>
              <td>{{ getDict('cutQuality', diamond.cutQuality) }}</td>
            </tr>
            <tr v-if="diamond.polish">
              <td>cutQuality</td>
              <td>{{ getDict('polish', diamond.polish) }}</td>
            </tr>
            <tr v-if="diamond.symmetry">
              <td>cutQuality</td>
              <td>{{ getDict('symmetry', diamond.symmetry) }}</td>
            </tr>
            <tr v-if="diamond.fluorIntensity">
              <td>cutQuality</td>
              <td>{{ getDict('fluorIntensity', diamond.fluorIntensity) }}</td>
            </tr>
            <tr v-if="diamond.fluorColor">
              <td>cutQuality</td>
              <td>{{ getDict('fluorColor', diamond.fluorColor) }}</td>
            </tr>
            <tr v-if="diamond.colorHue">
              <td>cutQuality</td>
              <td>{{ getDict('colorHue', diamond.colorHue) }}</td>
            </tr>
            <tr v-if="diamond.colorModifier">
              <td>cutQuality</td>
              <td>{{ getDict('colorModifier', diamond.colorModifier) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import client from '../services/client'

export default {
  name: 'Product',
    data() {
      return {
          iframe: {},
          diamond: {},
          constants: JSON.parse(localStorage.getItem('constants'))
      }
    },
    mounted() {
        if(!this.constants) {
            client.get('/v2/constants')
                .then(res => {
                    this.constants = res.data;
                    localStorage.setItem('constants', JSON.stringify(this.constants))
                })
        }

        client.get('/v3/diamond/' + this.$route.params.id)
            .then(res => {
                this.diamond = res.data;
                this.iframe.src = 'https://cutwise.com/widget/video/' + this.diamond.id
            })
    },
    methods: {
        loaded() {
            this.iframe.loaded = true
        },
        getDict(category, id) {

            if(!id) {
                return '';
            }

            return this.constants.dict[category].filter((obj)=>{
                return obj.id === id;
            }).pop().title;
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #product {
    margin-top: 50px;
  }
  #loader {
    height: 320px;
    width: 320px;
    background: url("../assets/loader-big.gif") center center no-repeat;
  }
</style>
