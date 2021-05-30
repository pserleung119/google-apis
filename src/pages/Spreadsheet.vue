<template>
  <Layout>
    <div v-for="edge in $page.googlePosts.edges" :key="edge.node.title" class="col-10">
      <div class="mb-3">
        <p><span class="h3">{{ edge.node.title }}</span> - {{ edge.node.created_at }}</p>
        <p class="text-truncate">{{ edge.node.content }}</p>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  googlePosts: allGoogleSheet {
    edges {
      node {
        locale
        title
        content
        created_at
      }
    }
  }
}
</page-query>

<script>
export default {
  created() {
    console.log(this.$page.googlePosts)
  }
}
</script>
