<template>
  <div
    ref="root"
    :class="{ 'is-fixed': isFixed, 'is-active': isFixed && isActive }"
    class="filter"
  >
    <button ref="btnToggle" @click="handleClick" class="filter__collapse">
      Переключить видимость фильтра
    </button>
    <div class="filter__icon">
      <svg
        viewBox="0 0 14 12"
        width="14"
        height="12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.938.5L7 11 13.062.5H.938z" />
      </svg>
      <span class="icon-text">filter</span>
    </div>
    <fieldset class="filter__group">
      <legend class="visually-hidden">Фильтр статей</legend>
      <filter-item
        v-for="item in filterItems"
        :key="item.type"
        :value="item.value"
        :name="item.name"
        :checked="item.checked"
        :handleChange="setActiveFilter"
      />
    </fieldset>
  </div>
</template>

<script>
import FilterItem from "./FilterItem.vue";
import FilterRect from "./getFilterRect";
import APP from "../../../../app/APP";
import getCssProp from "../../../../utils/getCssProp";

export default {
  name: "FilterElm",
  components: {
    FilterItem,
  },
  data() {
    return {
      isFixed: false,
      isActive: false,
      filterItems: [
        {
          value: "all",
          name: "все",
          checked: true,
        },
        {
          value: "event",
          name: "события",
          checked: false,
        },
        {
          value: "article",
          name: "статьи",
          checked: false,
        },
      ],
    };
  },
  props: {
    setActiveFilter: {
      type: Function,
      required: true,
    },
  },

  methods: {
    handleClick() {
      this.isActive = !this.isActive;
    },

    changePosition(target) {
      const rect = new FilterRect(this.$refs.root);
      const topGap = parseFloat(getCssProp("--top", this.$refs.root));

      let ticking = false;
      let start = 0;

      if (APP.scrollbar) {
        APP.scrollbar.addListener((status) => {
          if (!ticking) {
            requestAnimationFrame((time) => {
              console.log(
                "%c Filter.vue -> wheel event",
                "padding: 0.5em; color: #fff; background: red; font-weight: bold;"
              );

              const posY = status.offset.y;

              if (time - start > 50) {
                start = time;

                if (posY + topGap >= rect.getTop()) {
                  this.isFixed = true;
                } else {
                  this.$refs.btnToggle.blur();
                  this.isFixed = false;
                  this.isActive = false;
                }
              }

              ticking = false;
            });

            ticking = true;
          }
        });
      }
    },

    handleClickOutside(e) {
      const isOutside = !e.target.closest("div.filter");

      if (isOutside) {
        this.isActive = false;
      }
    },
  },

  mounted() {
    if (APP.isDesktop) {
      const intervalId = setInterval(() => {
        const scrollTarget = document.querySelector(
          "body > .os-padding > .os-viewport.os-viewport-native-scrollbars-invisible"
        );

        if (scrollTarget) {
          this.changePosition(scrollTarget);
          clearInterval(intervalId);
        }
      }, 200);

      document.addEventListener("pointerup", this.handleClickOutside);
    }
  },
};
</script>
