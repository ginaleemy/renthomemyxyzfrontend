<template>
  <div></div>
</template>

<script setup>
onMounted(() => {
  // set session to null
  useSetSession(null)

  setTimeout(() => {
    alert("You have been logged out! See you next time. =)")
    navigateTo("/")
  }, 100)
})
</script>
