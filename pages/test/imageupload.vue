<template>
  <div>
    <div v-for="(image, index) in uploadedImages" :key="index">
      <img v-if="image" :src="image" class="thumbnail-image" />

      <div>
        <label :for="`upload${index}`">
          <span>Upload Image (1 image)</span>
          <p>(Maximum photo size is 2MB)</p>
        </label>

        <input type="file" @change="e => uploadImage(e, index)" :name="`upload${index}`" :id="`upload${index}`" />
        <p v-if="uploading[index]">Uploading...</p>

        <button @click.prevent="removeImage(index)">Delete Photo</button>
      </div>
    </div>

    <br />
    <button @click.prevent="addImageUploadField">Add Photo</button>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const user = getUser()

// Receive `uploadedImages` as a prop and enable two-way data binding
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(["update:modelValue"])

let uploading = ref([false])
let uploadedImages = ref([...props.modelValue])

// Watch for changes in modelValue and update uploadedImages
watch(
  () => props.modelValue,
  newVal => {
    uploadedImages.value = [...newVal]
  },
  { immediate: true } // Trigger immediately in case there's an initial value
)

function validateFile(file) {
  // Validate file type
  const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"]
  if (!allowedFileTypes.includes(file.type)) {
    alert("Invalid file type. Only JPEG, PNG, and GIF images are allowed.")
    return false
  }

  // Validate file size (e.g., 5 MB limit)
  const maxSizeInMB = 2
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  if (file.size > maxSizeInBytes) {
    alert(`File size is too large. The maximum allowed size is ${maxSizeInMB} MB.`)
    return false
  }

  // If file passes all validation checks
  return true
}
async function uploadImage(e, index) {
  const file = e.target.files[0]
  if (!file) return

  if (validateFile(e.target.files[0])) {
    const formData = new FormData()
    formData.append("image", file)

    uploading.value[index] = true

    try {
      const response = await useFetch(runtimeConfig.public.apiBase + "properties/imageupload", {
        method: "post",
        body: formData,
        headers: {
          Authorization: "Bearer " + user?.accessToken
        }
      })
      uploadedImages.value[index] = response.data.value.url
      uploading.value[index] = false
      emit("update:modelValue", uploadedImages.value) // Emit the updated value
    } catch (error) {
      console.error("Error uploading image:", error)
      uploading.value[index] = false
      alert("Unable Upload Photos! Please relogin again to retry!")
      window.location.href = "/users/signout"
    }
  } else {
    alert("Error! Only JPEG, PNG, and GIF images are allowed. Maximum allowed size is 2MB.")
  }
}
function removeImage(index) {
  uploadedImages.value.splice(index, 1)
  uploading.value.splice(index, 1)
  emit("update:modelValue", uploadedImages.value) // Emit the updated value
}

function addImageUploadField() {
  if (uploadedImages.value.length === 0 || uploadedImages.value[uploadedImages.value.length - 1] !== null) {
    // Only add a new upload field if the last one isn't empty
    uploadedImages.value.push(null)
    uploading.value.push(false)
    emit("update:modelValue", uploadedImages.value) // Emit the updated value
  } else {
    alert("Please choose file")
  }
}
</script>
