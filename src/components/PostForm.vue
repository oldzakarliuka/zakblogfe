<template>
  <div class="post-form">
    <h1 class="title">{{ $route.params.id ? "Update" : "Create" }}</h1>
    <form @submit.prevent="sendPost">
      <p class="error" v-if="error">{{ error }}</p>
      <div class="form__row">
        <input
          type="text"
          placeholder="Title"
          class="form__input"
          v-model="title"
        />
      </div>
      <div class="form__group">
        <Editor
          class="editor"
          :value="content"
          @update:modelValue="content = $event"
        />
        <div class="thumb">
          <img
            class="response-img thumb__img"
            :src="file"
            alt="Thumb"
            v-if="file"
            @click="clearThumb"
          />
          <input
            type="file"
            name="file"
            ref="file"
            accept="image/*"
            @change="fileHandlerUpload"
          />
        </div>
        <div class="btn-group">
          <button class="btn btn-blue" type="submit">Send</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Editor from "./Editor.vue";
import { loadPost, savePost } from "../service/api.service";

export default {
  name: "PostForm",
  components: { Editor },
  props: {
    ttl: String,
    cntnt: String,
    thmb: String,
    pstId: Number,
  },
  data() {
    return {
      error: "",
      content: this.cntnt,
      file: this.thmb,
      title: this.ttl,
      postId: null,
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    if (id) {
      const post = await loadPost(id);
      this.content = post.content;
      this.file = post.thumb;
      this.title = post.title;
      this.postId = post.id;
    }
  },
  methods: {
    clearThumb() {
      this.file = null;
      this.$refs.file.value = null;
    },
    fileHandlerUpload() {
      if (this.$refs.file.files[0].size / 1024 / 1024 > 0.5) {
        alert("Selected photo bigger than 0.5 mb");
        this.$refs.file.value = null;
        return;
      }
      const fileReader = new FileReader();
      fileReader.onload = () => (this.file = fileReader.result);
      fileReader.readAsDataURL(this.$refs.file.files[0]);
    },
    checkForm() {
      this.error = "";
      if (!this.title) this.error = "Titile are required!";
      return this.error;
    },
    async sendPost() {
      if (this.checkForm()) return;

      const payload = {
        postId: this.postId,
        title: this.title,
        thumb: this.file,
        content: this.content,
      };
      const url = `post${this.$route.params.id ? "/update" : "/create"}`;
      try {
        await savePost(url, payload);
        this.$router.push("/admin/dashboard");
      } catch (e) {
        console.error(e);
        alert(
          "Ooops! Something went wrong! Please reload the page and try again!"
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.form__group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr min-content();
  gap: 5px;
  grid-template-areas:
    "editor editor thumb"
    "edito1 edito1 btn";
  padding: 10px;
}
.thumb {
  grid-area: thumb;
  img {
    max-height: 400px;
  }
  &__img {
    cursor: pointer;
  }
}
.editor {
  grid-area: editor;
}
.btn-group {
  grid-area: btn;
}

.error {
  font-size: 20px;
  padding: 0 10px;
}
</style>
