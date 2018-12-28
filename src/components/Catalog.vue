<template>
  <!-- Page Content -->
  <div id="catalog" class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="row" v-for="i in Math.ceil(diamonds.length / 4)">
          <div class="col-md-3" v-for="diamond in diamonds.slice((i - 1) * 4, i * 4)">
              <div class="card-img-top">
                <iframe
                        name="Cutwise Player"
                        width="100%"
                        height="200"
                        frameborder="0"
                        sandbox="allow-same-origin allow-scripts allow-orientation-lock allow-pointer-lock allow-presentation"
                        :src="'https://cutwise.com/widget/video/' + diamond.id"
                        allowfullscreen
                ></iframe>
              </div>
            <div class="card-body">
              <h5 class="card-title">{{ diamond.date|formatDate }}</h5>
              <p class="card-text">{{ diamond.sku }}</p>
              <router-link class="btn btn-primary" :to="{ name: 'Product', params: { id: diamond.id }}">More info</router-link>
            </div>
            </div>
        </div>
      </div>
    </div>
    <div id="paginator">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li v-for="p in pages" :class="p == page ? 'page-item disabled' : 'page-item'">
            <button class="page-link" @click="paginate(p)">{{ p }}</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Catalog',
    data() {
      return {
          diamonds: [],
          offset: 0,
          limit: 8,
          pages: [],
          total: 0,
          page: 1,
      }
    },
    mounted() {

      if(this.$route.query.page) {
          this.page = this.$route.query.page;
      }

      this.offset = (this.page - 1) * this.limit;

      axios.get('/v3/diamond?limit=' + this.limit + '&offset=' + this.offset).then(res => {
          this.diamonds = res.data;
          this.total = res.headers['x-total-count'];
          for(let i = 0; i < Math.ceil(this.total/this.limit); i++) {
              this.pages.push(i+1);
          }
      })
    },
    methods: {
      paginate(page) {
          this.page = page;
          this.offset = (page - 1) * this.limit;
          axios.get('/v3/diamond?limit=' + this.limit + '&offset=' + this.offset)
              .then(res => {
                this.diamonds = res.data;
                this.$router.push({
                        path: '/products',
                        query: { page: this.page }
                    })
          })
      }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #catalog, #paginator {
    margin-top: 40px;
  }
  .card-img-top {
    background: url("../assets/loader.gif") center center no-repeat;
  }
  .card-text {
    white-space: nowrap; /* Запрещаем перенос строк */
    overflow: hidden; /* Обрезаем все, что не помещается в область */
    text-overflow: ellipsis;
  }
</style>
