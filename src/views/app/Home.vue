<template>
  <div style="margin-top:10vh">
    <img style="width: 100%;" :src="cover_image" />
    <a-affix :offsetTop="60">
      <a-tabs style="background-color:#FFFFFF; z-index:1000" @change="changeView">
        <a-tab-pane key="0">
          <template slot="tab">
            <span>
              <a-avatar :src="constant_helper.mayor_details.avatar"></a-avatar>Mayor's Corner
            </span>
          </template>
        </a-tab-pane>
        <a-tab-pane tab="Public Service" key="1">
          <!-- <public-service></public-service> -->
        </a-tab-pane>
        <a-tab-pane tab="Permits" key="2">
          <!-- <permits></permits> -->
        </a-tab-pane>
        <a-tab-pane tab="Local Taxes" key="3">
          <!-- <permits></permits> -->
        </a-tab-pane>
        <a-tab-pane tab="Downloadable Forms" key="4">
          <!-- <downloadable-forms></downloadable-forms> -->
        </a-tab-pane>
      </a-tabs>
    </a-affix>
    <div style="margin-top: 5vh; margin-bottom: 5vh">
      <component v-bind:is="currentView" :full="true"></component>
    </div>
  </div>
</template>

<script>
import MayorsCorner from "@/components/MayorsCorner";
import PublicService from "@/components/PublicService";
import Permits from "@/components/Permits";
import LocalTaxes from "@/components/Taxes";
import DownloadableForms from "@/components/DownloadableForms";
// import cover_image from "@/assets/cover.jpg";

export default {
  components: {
    MayorsCorner,
    PublicService,
    Permits,
    LocalTaxes,
    DownloadableForms
  },
  data() {
    return {
      currentView: "MayorsCorner",
      visible: false,

      tabView: [
        "MayorsCorner",
        "PublicService",
        "Permits",
        "LocalTaxes",
        "DownloadableForms"
      ],
      cover_image: 'https://scontent.fmnl7-1.fna.fbcdn.net/v/t1.0-9/12524182_953304438094216_1059850541701783776_n.jpg?_nc_cat=111&_nc_eui2=AeGcePxp3xO8XafNvcrFlhbJZkXYmqJqCgXjCUld-WVL5l8XCXqvI85jpbHN1k9CmvmeP87weDQq6dqanlydEPu4b-rCGPhSh3Xx5-kq5pffsX_rZ_J6h-Bn6LAQgAS2frs&_nc_oc=AQnamdBNG_mZ-7NkrtxTiZwDvZ5zthYJzqwm8aLT1vKI62WRd1QVGCKW11s8vdXj1II&_nc_ht=scontent.fmnl7-1.fna&oh=88ead32528904a24b74b091e56fab485&oe=5E38934C'
    };
  },
  methods: {
    changeView(key) {
      console.log("key:::", key);
      this.currentView = this.tabView[key];
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style>
</style>