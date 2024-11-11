<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk}` : "RentHome.xyz Renting"
  }
})
/*
onMounted(() => {
      // set session from localStorage
      useSetSession(JSON.parse(localStorage.getItem("session")));
});
*/
onMounted(() => {
  const sessionCookie = useCookie("session")
  if (sessionCookie.value) {
    useSetSession(sessionCookie.value) // Use the value directly, no need to parse
  }
})
</script>
