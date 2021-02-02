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
          :modelValue="content"
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
import api from "../service/api.service";
import { mapGetters } from "vuex";

export default {
  name: "PostForm",
  components: { Editor },
  props: {
    ttl: String,
    cntnt: String,
    thmb: String,
    postId: Number,
  },
  data() {
    return {
      error: "",
      content: this.cntnt,
      file: this.thmb,
      title: this.ttl,
    };
  },
  mounted() {
    if (this.$route.params.id) {
      const post = this.getEditPost;
      this.content = post.content;
      this.file = post.thumb;
      this.title = post.title;
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
    sendPost() {
      if (this.checkForm()) return;

      const payload = {
        postId: this.postId,
        title: this.title,
        thumb: this.file,
        content: this.content,
      };
      const url = `post${this.$route.params.id ? "/update" : "/create"}`;
      api({ requiresAuth: true })
        .post(url, payload)
        .then(() => {
          this.$router.push("dashboard");
        })
        .catch(() => alert("Ooops smth wrong! \n Try to reload the page!"));
    },
  },
  computed: {
    ...mapGetters(["getEditPost"]),
  },
};
</script>
<style lang="scss">
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
