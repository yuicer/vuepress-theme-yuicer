<template>
  <div class="dropdown-wrapper" :class="{ open }">
    <button class="dropdown-title" type="button" :aria-label="dropdownAriaLabel" @click="toggle">
      <span class="title">{{ item.text }}</span>
      <span class="arrow" :class="open ? 'down' : 'right'"></span>
    </button>

    <DropdownTransition>
      <ul class="nav-dropdown" v-show="open">
        <li
          class="dropdown-item"
          :key="subItem.link || index"
          v-for="(subItem, index) in item.items"
        >
          <h4 v-if="subItem.type === 'links'">{{ subItem.text }}</h4>

          <ul class="dropdown-subitem-wrapper" v-if="subItem.type === 'links'">
            <li
              class="dropdown-subitem"
              :key="childSubItem.link"
              v-for="childSubItem in subItem.items"
            >
              <NavLink
                @focusout="
                  isLastItemOfArray(childSubItem, subItem.items) &&
                    isLastItemOfArray(subItem, item.items) &&
                    toggle()
                "
                :item="childSubItem"
              />
            </li>
          </ul>

          <NavLink
            v-else
            @focusout="isLastItemOfArray(subItem, item.items) && toggle()"
            :item="subItem"
          />
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'
import DropdownTransition from '@theme/components/DropdownTransition.vue'

export default {
  components: { NavLink, DropdownTransition },

  data() {
    return {
      open: false
    }
  },

  props: {
    item: {
      required: true
    }
  },

  computed: {
    dropdownAriaLabel() {
      return this.item.ariaLabel || this.item.text
    }
  },

  methods: {
    toggle() {
      this.open = !this.open
    },

    isLastItemOfArray(item, array) {
      if (Array.isArray(array)) return array[array.length - 1] === item
      return false
    }
  },

  watch: {
    $route() {
      this.open = false
    }
  }
}
</script>

<style lang="stylus">
.dropdown-wrapper {
  cursor: pointer;

  .dropdown-title {
    display: block;
    font-size: 0.9rem;
    background: transparent;
    border: none;
    font-weight: 500;
    color: $textColor;

    &:hover {
      border-color: transparent;
    }

    .arrow {
      vertical-align: middle;
      margin-top: -1px;
      margin-left: 0.4rem;
    }
  }

  .nav-dropdown {
    .dropdown-item {
      padding: 0 16px;

      h4 {
        margin: 0.45rem 0 0;
        border-top: 1px solid #eee;
        padding: 0.45rem 1.5rem 0 1.25rem;
      }

      .dropdown-subitem-wrapper {
        padding: 0;
        list-style: none;

        .dropdown-subitem {
          font-size: 0.9em;
        }
      }

      &:first-child h4 {
        margin-top: 0;
        padding-top: 0;
        border-top: 0;
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .dropdown-wrapper {
    &.open .dropdown-title {
      margin-bottom: 0.5rem;
    }

    .nav-dropdown {
      transition: height 0.1s ease-out;
      overflow: hidden;

      .dropdown-item {
        h4 {
          border-top: 0;
          margin-top: 0;
          padding-top: 0;
        }

        h4, & > a {
          font-size: 15px;
          line-height: 2rem;
        }

        .dropdown-subitem {
          font-size: 14px;
          padding-left: 1rem;
        }
      }
    }
  }
}

@media (min-width: $MQMobile) {
  .dropdown-wrapper {
    height: 1.8rem;

    &:hover .nav-dropdown, &.open .nav-dropdown {
      // override the inline style.
      display: block !important;
    }

    &.open:blur {
      display: none;
    }

    .dropdown-title .arrow {
      // make the arrow always down at desktop
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 6px solid $arrowBgColor;
      border-bottom: 0;
    }

    .nav-dropdown {
      display: none;
      // Avoid height shaked by clicking
      height: auto !important;
      box-sizing: border-box;
      max-height: calc(100vh - 2.7rem);
      overflow-y: auto;
      position: absolute;
      top: 100%;
      right: 0;
      background-color: #fff;
      padding: 0.6rem 0;
      border: 1px solid #ddd;
      border-bottom-color: #ccc;
      text-align: left;
      border-radius: 0.25rem;
      white-space: nowrap;
      margin: 0;
    }
  }
}
</style>
