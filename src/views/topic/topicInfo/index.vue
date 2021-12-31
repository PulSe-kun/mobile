<template>
  <div class="">内容</div>
</template>

<script>
import { detailaction } from "@/api/topic/topicInfo";
export default {
  data() {
    return {
      list: {},
    };
  },
  computed: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
     detailaction({
        id: this.$route.query.id,
      }).then((res) => {
        console.log(res);
        this.list = res;
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>