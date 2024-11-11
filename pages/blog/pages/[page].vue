<template>
  <div>
    <section id="latest">
      <div class="container">
        <div class="row thehead mb30">
          <div class="col-md-8 text-left">
            <h3>Blog</h3>
          </div>
          <div class="col-md-4 text-right">
            <p><a href="#">Home</a> > <a href="#">Blog</a></p>
          </div>
        </div>

        <div class="row articles">
          <div class="col-md-12 text-center">
            <div class="row">
              <div v-for="post in posts" class="col-md-4 text-left">
                <div class="outer">
                  <a href="single-blog.html">
                    <div class="upper">
                      <img src="/assets/pictures/inner.png" />
                    </div>
                    <div class="lower">
                      <h3>{{ post.title }}</h3>
                      <span>{{ formatDate(post.createdAt) }}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="row text-center thepage">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item" v-if="page > 1">
                  <a :href="'/blog/pages/' + prevpage" class="page-link">
                    <span>Prev</span>
                  </a>
                </li>

                <li class="display@sm pagination__item_wrapper page-link" v-for="pageNumber in pageNumbers" :key="pageNumber">
                  <a :href="'/blog/pages/' + pageNumber">{{ pageNumber }}</a>
                </li>

                <li class="page-item" v-if="page < totalPages">
                  <a :href="'/blog/pages/' + nextpage" class="page-link">
                    <span>Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

let page = route.params.page

const posts = ref([])
const { data } = await useFetch(runtimeConfig.public.apiBase + "posts?page=" + page)

if (data.value) {
  posts.value = data.value.posts
}

/* pagination */

const totalPages = data.value.totalPages

let prevpage = parseInt(page) - 1
if (prevpage < 1) {
  prevpage = null
}
let nextpage = parseInt(page) + 1
if (nextpage > totalPages) {
  nextpage = null
}

const pageNumbers = computed(() => {
  const numbers = []
  for (let i = 1; i <= totalPages; i++) {
    numbers.push(i)
  }
  return numbers
})

/* end pagination */
</script>
