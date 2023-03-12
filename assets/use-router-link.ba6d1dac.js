import { c as computed, O as markRaw, B as defineComponent, h, g as getCurrentInstance } from "./index.40a16a13.js";
const useSizeDefaults = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 38,
  xl: 46
};
const useSizeProps = {
  size: String
};
function useSize(props, sizes = useSizeDefaults) {
  return computed(() => props.size !== void 0 ? { fontSize: props.size in sizes ? `${sizes[props.size]}px` : props.size } : null);
}
const createComponent = (raw) => markRaw(defineComponent(raw));
const createDirective = (raw) => markRaw(raw);
function hSlot(slot, otherwise) {
  return slot !== void 0 ? slot() || otherwise : otherwise;
}
function hUniqueSlot(slot, otherwise) {
  if (slot !== void 0) {
    const vnode = slot();
    if (vnode !== void 0 && vnode !== null) {
      return vnode.slice();
    }
  }
  return otherwise;
}
function hMergeSlot(slot, source) {
  return slot !== void 0 ? source.concat(slot()) : source;
}
function hMergeSlotSafely(slot, source) {
  if (slot === void 0) {
    return source;
  }
  return source !== void 0 ? source.concat(slot()) : slot();
}
const defaultViewBox = "0 0 24 24";
const sameFn = (i) => i;
const ionFn = (i) => `ionicons ${i}`;
const libMap = {
  "mdi-": (i) => `mdi ${i}`,
  "icon-": sameFn,
  "bt-": (i) => `bt ${i}`,
  "eva-": (i) => `eva ${i}`,
  "ion-md": ionFn,
  "ion-ios": ionFn,
  "ion-logo": ionFn,
  "iconfont ": sameFn,
  "ti-": (i) => `themify-icon ${i}`,
  "bi-": (i) => `bootstrap-icons ${i}`
};
const matMap = {
  o_: "-outlined",
  r_: "-round",
  s_: "-sharp"
};
const symMap = {
  sym_o_: "-outlined",
  sym_r_: "-rounded",
  sym_s_: "-sharp"
};
const libRE = new RegExp("^(" + Object.keys(libMap).join("|") + ")");
const matRE = new RegExp("^(" + Object.keys(matMap).join("|") + ")");
const symRE = new RegExp("^(" + Object.keys(symMap).join("|") + ")");
const mRE = /^[Mm]\s?[-+]?\.?\d/;
const imgRE = /^img:/;
const svgUseRE = /^svguse:/;
const ionRE = /^ion-/;
const faRE = /^(fa-(solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
var QIcon = createComponent({
  name: "QIcon",
  props: {
    ...useSizeProps,
    tag: {
      type: String,
      default: "i"
    },
    name: String,
    color: String,
    left: Boolean,
    right: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props);
    const classes = computed(
      () => "q-icon" + (props.left === true ? " on-left" : "") + (props.right === true ? " on-right" : "") + (props.color !== void 0 ? ` text-${props.color}` : "")
    );
    const type = computed(() => {
      let cls;
      let icon = props.name;
      if (icon === "none" || !icon) {
        return { none: true };
      }
      if ($q.iconMapFn !== null) {
        const res = $q.iconMapFn(icon);
        if (res !== void 0) {
          if (res.icon !== void 0) {
            icon = res.icon;
            if (icon === "none" || !icon) {
              return { none: true };
            }
          } else {
            return {
              cls: res.cls,
              content: res.content !== void 0 ? res.content : " "
            };
          }
        }
      }
      if (mRE.test(icon) === true) {
        const [def, viewBox = defaultViewBox] = icon.split("|");
        return {
          svg: true,
          viewBox,
          nodes: def.split("&&").map((path) => {
            const [d, style, transform] = path.split("@@");
            return h("path", { style, d, transform });
          })
        };
      }
      if (imgRE.test(icon) === true) {
        return {
          img: true,
          src: icon.substring(4)
        };
      }
      if (svgUseRE.test(icon) === true) {
        const [def, viewBox = defaultViewBox] = icon.split("|");
        return {
          svguse: true,
          src: def.substring(7),
          viewBox
        };
      }
      let content = " ";
      const matches = icon.match(libRE);
      if (matches !== null) {
        cls = libMap[matches[1]](icon);
      } else if (faRE.test(icon) === true) {
        cls = icon;
      } else if (ionRE.test(icon) === true) {
        cls = `ionicons ion-${$q.platform.is.ios === true ? "ios" : "md"}${icon.substring(3)}`;
      } else if (symRE.test(icon) === true) {
        cls = "notranslate material-symbols";
        const matches2 = icon.match(symRE);
        if (matches2 !== null) {
          icon = icon.substring(6);
          cls += symMap[matches2[1]];
        }
        content = icon;
      } else {
        cls = "notranslate material-icons";
        const matches2 = icon.match(matRE);
        if (matches2 !== null) {
          icon = icon.substring(2);
          cls += matMap[matches2[1]];
        }
        content = icon;
      }
      return {
        cls,
        content
      };
    });
    return () => {
      const data = {
        class: classes.value,
        style: sizeStyle.value,
        "aria-hidden": "true",
        role: "presentation"
      };
      if (type.value.none === true) {
        return h(props.tag, data, hSlot(slots.default));
      }
      if (type.value.img === true) {
        return h("span", data, hMergeSlot(slots.default, [
          h("img", { src: type.value.src })
        ]));
      }
      if (type.value.svg === true) {
        return h("span", data, hMergeSlot(slots.default, [
          h("svg", {
            viewBox: type.value.viewBox || "0 0 24 24"
          }, type.value.nodes)
        ]));
      }
      if (type.value.svguse === true) {
        return h("span", data, hMergeSlot(slots.default, [
          h("svg", {
            viewBox: type.value.viewBox
          }, [
            h("use", { "xlink:href": type.value.src })
          ])
        ]));
      }
      if (type.value.cls !== void 0) {
        data.class += " " + type.value.cls;
      }
      return h(props.tag, data, hMergeSlot(slots.default, [
        type.value.content
      ]));
    };
  }
});
const useSpinnerProps = {
  size: {
    type: [Number, String],
    default: "1em"
  },
  color: String
};
function useSpinner(props) {
  return {
    cSize: computed(() => props.size in useSizeDefaults ? `${useSizeDefaults[props.size]}px` : props.size),
    classes: computed(
      () => "q-spinner" + (props.color ? ` text-${props.color}` : "")
    )
  };
}
var QSpinner = createComponent({
  name: "QSpinner",
  props: {
    ...useSpinnerProps,
    thickness: {
      type: Number,
      default: 5
    }
  },
  setup(props) {
    const { cSize, classes } = useSpinner(props);
    return () => h("svg", {
      class: classes.value + " q-spinner-mat",
      width: cSize.value,
      height: cSize.value,
      viewBox: "25 25 50 50"
    }, [
      h("circle", {
        class: "path",
        cx: "50",
        cy: "50",
        r: "20",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props.thickness,
        "stroke-miterlimit": "10"
      })
    ]);
  }
});
function vmHasRouter(vm) {
  return vm.appContext.config.globalProperties.$router !== void 0;
}
function vmIsDestroyed(vm) {
  return vm.isUnmounted === true || vm.isDeactivated === true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key], outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) {
        return false;
      }
    } else if (Array.isArray(outerValue) === false || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i])) {
      return false;
    }
  }
  return true;
}
function isEquivalentArray(a, b) {
  return Array.isArray(b) === true ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function isSameRouteLocationParamsValue(a, b) {
  return Array.isArray(a) === true ? isEquivalentArray(a, b) : Array.isArray(b) === true ? isEquivalentArray(b, a) : a === b;
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a) {
    if (isSameRouteLocationParamsValue(a[key], b[key]) === false) {
      return false;
    }
  }
  return true;
}
const useRouterLinkProps = {
  to: [String, Object],
  replace: Boolean,
  exact: Boolean,
  activeClass: {
    type: String,
    default: "q-router-link--active"
  },
  exactActiveClass: {
    type: String,
    default: "q-router-link--exact-active"
  },
  href: String,
  target: String,
  disable: Boolean
};
function useRouterLink({ fallbackTag, useDisableForRouterLinkProps = true } = {}) {
  const vm = getCurrentInstance();
  const { props, proxy, emit } = vm;
  const hasRouter = vmHasRouter(vm);
  const hasHrefLink = computed(() => props.disable !== true && props.href !== void 0);
  const hasRouterLinkProps = useDisableForRouterLinkProps === true ? computed(
    () => hasRouter === true && props.disable !== true && hasHrefLink.value !== true && props.to !== void 0 && props.to !== null && props.to !== ""
  ) : computed(
    () => hasRouter === true && hasHrefLink.value !== true && props.to !== void 0 && props.to !== null && props.to !== ""
  );
  const resolvedLink = computed(() => hasRouterLinkProps.value === true ? getLink(props.to) : null);
  const hasRouterLink = computed(() => resolvedLink.value !== null);
  const hasLink = computed(() => hasHrefLink.value === true || hasRouterLink.value === true);
  const linkTag = computed(() => props.type === "a" || hasLink.value === true ? "a" : props.tag || fallbackTag || "div");
  const linkAttrs = computed(() => hasHrefLink.value === true ? {
    href: props.href,
    target: props.target
  } : hasRouterLink.value === true ? {
    href: resolvedLink.value.href,
    target: props.target
  } : {});
  const linkActiveIndex = computed(() => {
    if (hasRouterLink.value === false) {
      return -1;
    }
    const { matched } = resolvedLink.value, { length } = matched, routeMatched = matched[length - 1];
    if (routeMatched === void 0) {
      return -1;
    }
    const currentMatched = proxy.$route.matched;
    if (currentMatched.length === 0) {
      return -1;
    }
    const index = currentMatched.findIndex(
      isSameRouteRecord.bind(null, routeMatched)
    );
    if (index > -1) {
      return index;
    }
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(
      isSameRouteRecord.bind(null, matched[length - 2])
    ) : index;
  });
  const linkIsActive = computed(
    () => hasRouterLink.value === true && linkActiveIndex.value !== -1 && includesParams(proxy.$route.params, resolvedLink.value.params)
  );
  const linkIsExactActive = computed(
    () => linkIsActive.value === true && linkActiveIndex.value === proxy.$route.matched.length - 1 && isSameRouteLocationParams(proxy.$route.params, resolvedLink.value.params)
  );
  const linkClass = computed(() => hasRouterLink.value === true ? linkIsExactActive.value === true ? ` ${props.exactActiveClass} ${props.activeClass}` : props.exact === true ? "" : linkIsActive.value === true ? ` ${props.activeClass}` : "" : "");
  function getLink(to) {
    try {
      return proxy.$router.resolve(to);
    } catch (_) {
    }
    return null;
  }
  function navigateToRouterLink(e, { returnRouterError, to = props.to, replace = props.replace } = {}) {
    if (props.disable === true) {
      e.preventDefault();
      return Promise.resolve(false);
    }
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.button !== void 0 && e.button !== 0 || props.target === "_blank") {
      return Promise.resolve(false);
    }
    e.preventDefault();
    const promise = proxy.$router[replace === true ? "replace" : "push"](to);
    return returnRouterError === true ? promise : promise.then(() => {
    }).catch(() => {
    });
  }
  function navigateOnClick(e) {
    if (hasRouterLink.value === true) {
      const go = (opts) => navigateToRouterLink(e, opts);
      emit("click", e, go);
      e.defaultPrevented !== true && go();
    } else {
      emit("click", e);
    }
  }
  return {
    hasRouterLink,
    hasHrefLink,
    hasLink,
    linkTag,
    resolvedLink,
    linkIsActive,
    linkIsExactActive,
    linkClass,
    linkAttrs,
    getLink,
    navigateToRouterLink,
    navigateOnClick
  };
}
export { QIcon as Q, hUniqueSlot as a, hMergeSlot as b, createComponent as c, useRouterLink as d, createDirective as e, useSizeProps as f, useSize as g, hSlot as h, QSpinner as i, hMergeSlotSafely as j, useRouterLinkProps as u, vmIsDestroyed as v };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXJvdXRlci1saW5rLmJhNmQxZGFjLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL3JlbmRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaWNvbi9RSWNvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc3Bpbm5lci91c2Utc3Bpbm5lci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9RU3Bpbm5lci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvdm0uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1yb3V0ZXItbGluay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IHVzZVNpemVEZWZhdWx0cyA9IHtcbiAgeHM6IDE4LFxuICBzbTogMjQsXG4gIG1kOiAzMixcbiAgbGc6IDM4LFxuICB4bDogNDZcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVNpemVQcm9wcyA9IHtcbiAgc2l6ZTogU3RyaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgc2l6ZXMgPSB1c2VTaXplRGVmYXVsdHMpIHtcbiAgLy8gcmV0dXJuIHNpemVTdHlsZVxuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLnNpemUgIT09IHZvaWQgMFxuICAgICAgPyB7IGZvbnRTaXplOiBwcm9wcy5zaXplIGluIHNpemVzID8gYCR7IHNpemVzWyBwcm9wcy5zaXplIF0gfXB4YCA6IHByb3BzLnNpemUgfVxuICAgICAgOiBudWxsXG4gICkpXG59XG4iLCJpbXBvcnQgeyBkZWZpbmVDb21wb25lbnQsIG1hcmtSYXcgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDb21wb25lbnQgPSByYXcgPT4gbWFya1JhdyhkZWZpbmVDb21wb25lbnQocmF3KSlcbmV4cG9ydCBjb25zdCBjcmVhdGVEaXJlY3RpdmUgPSByYXcgPT4gbWFya1JhdyhyYXcpXG4iLCJpbXBvcnQgeyBoLCB3aXRoRGlyZWN0aXZlcyB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIGhTbG90IChzbG90LCBvdGhlcndpc2UpIHtcbiAgcmV0dXJuIHNsb3QgIT09IHZvaWQgMFxuICAgID8gc2xvdCgpIHx8IG90aGVyd2lzZVxuICAgIDogb3RoZXJ3aXNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoVW5pcXVlU2xvdCAoc2xvdCwgb3RoZXJ3aXNlKSB7XG4gIGlmIChzbG90ICE9PSB2b2lkIDApIHtcbiAgICBjb25zdCB2bm9kZSA9IHNsb3QoKVxuICAgIGlmICh2bm9kZSAhPT0gdm9pZCAwICYmIHZub2RlICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdm5vZGUuc2xpY2UoKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdGhlcndpc2Vcbn1cblxuLyoqXG4gKiBTb3VyY2UgZGVmaW5pdGVseSBleGlzdHMsXG4gKiBzbyBpdCdzIG1lcmdlZCB3aXRoIHRoZSBwb3NzaWJsZSBzbG90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoTWVyZ2VTbG90IChzbG90LCBzb3VyY2UpIHtcbiAgcmV0dXJuIHNsb3QgIT09IHZvaWQgMFxuICAgID8gc291cmNlLmNvbmNhdChzbG90KCkpXG4gICAgOiBzb3VyY2Vcbn1cblxuLyoqXG4gKiBNZXJnZSB3aXRoIHBvc3NpYmxlIHNsb3QsXG4gKiBldmVuIGlmIHNvdXJjZSBtaWdodCBub3QgZXhpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhNZXJnZVNsb3RTYWZlbHkgKHNsb3QsIHNvdXJjZSkge1xuICBpZiAoc2xvdCA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIHNvdXJjZVxuICB9XG5cbiAgcmV0dXJuIHNvdXJjZSAhPT0gdm9pZCAwXG4gICAgPyBzb3VyY2UuY29uY2F0KHNsb3QoKSlcbiAgICA6IHNsb3QoKVxufVxuXG4vKlxuICogKFN0cmluZykgIGtleSAgICAgICAtIHVuaXF1ZSB2bm9kZSBrZXlcbiAqIChCb29sZWFuKSBjb25kaXRpb24gLSBzaG91bGQgY2hhbmdlIE9OTFkgd2hlbiBhZGRpbmcvcmVtb3ZpbmcgZGlyZWN0aXZlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoRGlyIChcbiAgdGFnLFxuICBkYXRhLFxuICBjaGlsZHJlbixcbiAga2V5LFxuICBjb25kaXRpb24sXG4gIGdldERpcnNGblxuKSB7XG4gIGRhdGEua2V5ID0ga2V5ICsgY29uZGl0aW9uXG5cbiAgY29uc3Qgdm5vZGUgPSBoKHRhZywgZGF0YSwgY2hpbGRyZW4pXG5cbiAgcmV0dXJuIGNvbmRpdGlvbiA9PT0gdHJ1ZVxuICAgID8gd2l0aERpcmVjdGl2ZXModm5vZGUsIGdldERpcnNGbigpKVxuICAgIDogdm5vZGVcbn1cbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VTaXplLCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNpemUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QsIGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3QgZGVmYXVsdFZpZXdCb3ggPSAnMCAwIDI0IDI0J1xuXG5jb25zdCBzYW1lRm4gPSBpID0+IGlcbmNvbnN0IGlvbkZuID0gaSA9PiBgaW9uaWNvbnMgJHsgaSB9YFxuXG5jb25zdCBsaWJNYXAgPSB7XG4gICdtZGktJzogaSA9PiBgbWRpICR7IGkgfWAsXG4gICdpY29uLSc6IHNhbWVGbiwgLy8gZm9udGF3ZXNvbWUgZXF1aXZcbiAgJ2J0LSc6IGkgPT4gYGJ0ICR7IGkgfWAsXG4gICdldmEtJzogaSA9PiBgZXZhICR7IGkgfWAsXG4gICdpb24tbWQnOiBpb25GbixcbiAgJ2lvbi1pb3MnOiBpb25GbixcbiAgJ2lvbi1sb2dvJzogaW9uRm4sXG4gICdpY29uZm9udCAnOiBzYW1lRm4sXG4gICd0aS0nOiBpID0+IGB0aGVtaWZ5LWljb24gJHsgaSB9YCxcbiAgJ2JpLSc6IGkgPT4gYGJvb3RzdHJhcC1pY29ucyAkeyBpIH1gXG59XG5cbmNvbnN0IG1hdE1hcCA9IHtcbiAgb186ICctb3V0bGluZWQnLFxuICByXzogJy1yb3VuZCcsXG4gIHNfOiAnLXNoYXJwJ1xufVxuXG5jb25zdCBzeW1NYXAgPSB7XG4gIHN5bV9vXzogJy1vdXRsaW5lZCcsXG4gIHN5bV9yXzogJy1yb3VuZGVkJyxcbiAgc3ltX3NfOiAnLXNoYXJwJ1xufVxuXG5jb25zdCBsaWJSRSA9IG5ldyBSZWdFeHAoJ14oJyArIE9iamVjdC5rZXlzKGxpYk1hcCkuam9pbignfCcpICsgJyknKVxuY29uc3QgbWF0UkUgPSBuZXcgUmVnRXhwKCdeKCcgKyBPYmplY3Qua2V5cyhtYXRNYXApLmpvaW4oJ3wnKSArICcpJylcbmNvbnN0IHN5bVJFID0gbmV3IFJlZ0V4cCgnXignICsgT2JqZWN0LmtleXMoc3ltTWFwKS5qb2luKCd8JykgKyAnKScpXG5jb25zdCBtUkUgPSAvXltNbV1cXHM/Wy0rXT9cXC4/XFxkL1xuY29uc3QgaW1nUkUgPSAvXmltZzovXG5jb25zdCBzdmdVc2VSRSA9IC9ec3ZndXNlOi9cbmNvbnN0IGlvblJFID0gL15pb24tL1xuY29uc3QgZmFSRSA9IC9eKGZhLShzb2xpZHxyZWd1bGFyfGxpZ2h0fGJyYW5kc3xkdW90b25lfHRoaW4pfFtsZl1hW3NybGJka10/KSAvXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSWNvbicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VTaXplUHJvcHMsXG5cbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdpJ1xuICAgIH0sXG5cbiAgICBuYW1lOiBTdHJpbmcsXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBsZWZ0OiBCb29sZWFuLFxuICAgIHJpZ2h0OiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3Qgc2l6ZVN0eWxlID0gdXNlU2l6ZShwcm9wcylcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtaWNvbidcbiAgICAgICsgKHByb3BzLmxlZnQgPT09IHRydWUgPyAnIG9uLWxlZnQnIDogJycpIC8vIFRPRE8gUXYzOiBkcm9wIHRoaXNcbiAgICAgICsgKHByb3BzLnJpZ2h0ID09PSB0cnVlID8gJyBvbi1yaWdodCcgOiAnJylcbiAgICAgICsgKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCB0eXBlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgbGV0IGNsc1xuICAgICAgbGV0IGljb24gPSBwcm9wcy5uYW1lXG5cbiAgICAgIGlmIChpY29uID09PSAnbm9uZScgfHwgIWljb24pIHtcbiAgICAgICAgcmV0dXJuIHsgbm9uZTogdHJ1ZSB9XG4gICAgICB9XG5cbiAgICAgIGlmICgkcS5pY29uTWFwRm4gIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgcmVzID0gJHEuaWNvbk1hcEZuKGljb24pXG4gICAgICAgIGlmIChyZXMgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGlmIChyZXMuaWNvbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBpY29uID0gcmVzLmljb25cbiAgICAgICAgICAgIGlmIChpY29uID09PSAnbm9uZScgfHwgIWljb24pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgbm9uZTogdHJ1ZSB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY2xzOiByZXMuY2xzLFxuICAgICAgICAgICAgICBjb250ZW50OiByZXMuY29udGVudCAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgICAgPyByZXMuY29udGVudFxuICAgICAgICAgICAgICAgIDogJyAnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtUkUudGVzdChpY29uKSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBbIGRlZiwgdmlld0JveCA9IGRlZmF1bHRWaWV3Qm94IF0gPSBpY29uLnNwbGl0KCd8JylcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN2ZzogdHJ1ZSxcbiAgICAgICAgICB2aWV3Qm94LFxuICAgICAgICAgIG5vZGVzOiBkZWYuc3BsaXQoJyYmJykubWFwKHBhdGggPT4ge1xuICAgICAgICAgICAgY29uc3QgWyBkLCBzdHlsZSwgdHJhbnNmb3JtIF0gPSBwYXRoLnNwbGl0KCdAQCcpXG4gICAgICAgICAgICByZXR1cm4gaCgncGF0aCcsIHsgc3R5bGUsIGQsIHRyYW5zZm9ybSB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGltZ1JFLnRlc3QoaWNvbikgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbWc6IHRydWUsXG4gICAgICAgICAgc3JjOiBpY29uLnN1YnN0cmluZyg0KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdmdVc2VSRS50ZXN0KGljb24pID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IFsgZGVmLCB2aWV3Qm94ID0gZGVmYXVsdFZpZXdCb3ggXSA9IGljb24uc3BsaXQoJ3wnKVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3ZndXNlOiB0cnVlLFxuICAgICAgICAgIHNyYzogZGVmLnN1YnN0cmluZyg3KSxcbiAgICAgICAgICB2aWV3Qm94XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGNvbnRlbnQgPSAnICdcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBpY29uLm1hdGNoKGxpYlJFKVxuXG4gICAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgICBjbHMgPSBsaWJNYXBbIG1hdGNoZXNbIDEgXSBdKGljb24pXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChmYVJFLnRlc3QoaWNvbikgPT09IHRydWUpIHtcbiAgICAgICAgY2xzID0gaWNvblxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaW9uUkUudGVzdChpY29uKSA9PT0gdHJ1ZSkge1xuICAgICAgICBjbHMgPSBgaW9uaWNvbnMgaW9uLSR7ICRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSA/ICdpb3MnIDogJ21kJyB9JHsgaWNvbi5zdWJzdHJpbmcoMykgfWBcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHN5bVJFLnRlc3QoaWNvbikgPT09IHRydWUpIHtcbiAgICAgICAgLy8gXCJub3RyYW5zbGF0ZVwiIGNsYXNzIGlzIGZvciBHb29nbGUgVHJhbnNsYXRlXG4gICAgICAgIC8vIHRvIGF2b2lkIHRhbXBlcmluZyB3aXRoIE1hdGVyaWFsIFN5bWJvbHMgbGlnYXR1cmUgZm9udFxuICAgICAgICAvL1xuICAgICAgICAvLyBDYXV0aW9uOiBUbyBiZSBhYmxlIHRvIGFkZCBzdWZmaXggdG8gdGhlIGNsYXNzIG5hbWUsXG4gICAgICAgIC8vIGtlZXAgdGhlICdtYXRlcmlhbC1zeW1ib2xzJyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcuXG4gICAgICAgIGNscyA9ICdub3RyYW5zbGF0ZSBtYXRlcmlhbC1zeW1ib2xzJ1xuXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBpY29uLm1hdGNoKHN5bVJFKVxuICAgICAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgICAgIGljb24gPSBpY29uLnN1YnN0cmluZyg2KVxuICAgICAgICAgIGNscyArPSBzeW1NYXBbIG1hdGNoZXNbIDEgXSBdXG4gICAgICAgIH1cblxuICAgICAgICBjb250ZW50ID0gaWNvblxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIFwibm90cmFuc2xhdGVcIiBjbGFzcyBpcyBmb3IgR29vZ2xlIFRyYW5zbGF0ZVxuICAgICAgICAvLyB0byBhdm9pZCB0YW1wZXJpbmcgd2l0aCBNYXRlcmlhbCBJY29ucyBsaWdhdHVyZSBmb250XG4gICAgICAgIC8vXG4gICAgICAgIC8vIENhdXRpb246IFRvIGJlIGFibGUgdG8gYWRkIHN1ZmZpeCB0byB0aGUgY2xhc3MgbmFtZSxcbiAgICAgICAgLy8ga2VlcCB0aGUgJ21hdGVyaWFsLWljb25zJyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcuXG4gICAgICAgIGNscyA9ICdub3RyYW5zbGF0ZSBtYXRlcmlhbC1pY29ucydcblxuICAgICAgICBjb25zdCBtYXRjaGVzID0gaWNvbi5tYXRjaChtYXRSRSlcbiAgICAgICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgICAgICBpY29uID0gaWNvbi5zdWJzdHJpbmcoMilcbiAgICAgICAgICBjbHMgKz0gbWF0TWFwWyBtYXRjaGVzWyAxIF0gXVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGVudCA9IGljb25cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2xzLFxuICAgICAgICBjb250ZW50XG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHNpemVTdHlsZS52YWx1ZSxcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICByb2xlOiAncHJlc2VudGF0aW9uJ1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS52YWx1ZS5ub25lID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBoKHByb3BzLnRhZywgZGF0YSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlLnZhbHVlLmltZyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaCgnc3BhbicsIGRhdGEsIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW1xuICAgICAgICAgIGgoJ2ltZycsIHsgc3JjOiB0eXBlLnZhbHVlLnNyYyB9KVxuICAgICAgICBdKSlcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUudmFsdWUuc3ZnID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBoKCdzcGFuJywgZGF0YSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgICAgaCgnc3ZnJywge1xuICAgICAgICAgICAgdmlld0JveDogdHlwZS52YWx1ZS52aWV3Qm94IHx8ICcwIDAgMjQgMjQnXG4gICAgICAgICAgfSwgdHlwZS52YWx1ZS5ub2RlcylcbiAgICAgICAgXSkpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlLnZhbHVlLnN2Z3VzZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaCgnc3BhbicsIGRhdGEsIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW1xuICAgICAgICAgIGgoJ3N2ZycsIHtcbiAgICAgICAgICAgIHZpZXdCb3g6IHR5cGUudmFsdWUudmlld0JveFxuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIGgoJ3VzZScsIHsgJ3hsaW5rOmhyZWYnOiB0eXBlLnZhbHVlLnNyYyB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS52YWx1ZS5jbHMgIT09IHZvaWQgMCkge1xuICAgICAgICBkYXRhLmNsYXNzICs9ICcgJyArIHR5cGUudmFsdWUuY2xzXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKHByb3BzLnRhZywgZGF0YSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgIHR5cGUudmFsdWUuY29udGVudFxuICAgICAgXSkpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyB1c2VTaXplRGVmYXVsdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuXG5leHBvcnQgY29uc3QgdXNlU3Bpbm5lclByb3BzID0ge1xuICBzaXplOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6ICcxZW0nXG4gIH0sXG4gIGNvbG9yOiBTdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlU3Bpbm5lciAocHJvcHMpIHtcbiAgcmV0dXJuIHtcbiAgICBjU2l6ZTogY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuc2l6ZSBpbiB1c2VTaXplRGVmYXVsdHNcbiAgICAgICAgPyBgJHsgdXNlU2l6ZURlZmF1bHRzWyBwcm9wcy5zaXplIF0gfXB4YFxuICAgICAgICA6IHByb3BzLnNpemVcbiAgICApKSxcblxuICAgIGNsYXNzZXM6IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1zcGlubmVyJyArIChwcm9wcy5jb2xvciA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgIClcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZVNwaW5uZXIsIHsgdXNlU3Bpbm5lclByb3BzIH0gZnJvbSAnLi91c2Utc3Bpbm5lci5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU3Bpbm5lcicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VTcGlubmVyUHJvcHMsXG5cbiAgICB0aGlja25lc3M6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDVcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzKSB7XG4gICAgY29uc3QgeyBjU2l6ZSwgY2xhc3NlcyB9ID0gdXNlU3Bpbm5lcihwcm9wcylcblxuICAgIHJldHVybiAoKSA9PiBoKCdzdmcnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSArICcgcS1zcGlubmVyLW1hdCcsXG4gICAgICB3aWR0aDogY1NpemUudmFsdWUsXG4gICAgICBoZWlnaHQ6IGNTaXplLnZhbHVlLFxuICAgICAgdmlld0JveDogJzI1IDI1IDUwIDUwJ1xuICAgIH0sIFtcbiAgICAgIGgoJ2NpcmNsZScsIHtcbiAgICAgICAgY2xhc3M6ICdwYXRoJyxcbiAgICAgICAgY3g6ICc1MCcsXG4gICAgICAgIGN5OiAnNTAnLFxuICAgICAgICByOiAnMjAnLFxuICAgICAgICBmaWxsOiAnbm9uZScsXG4gICAgICAgIHN0cm9rZTogJ2N1cnJlbnRDb2xvcicsXG4gICAgICAgICdzdHJva2Utd2lkdGgnOiBwcm9wcy50aGlja25lc3MsXG4gICAgICAgICdzdHJva2UtbWl0ZXJsaW1pdCc6ICcxMCdcbiAgICAgIH0pXG4gICAgXSlcbiAgfVxufSlcbiIsIlxuLy8gY29waWVkIHRvIGRvY3MgdG9vXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50UHJveHkgKHByb3h5KSB7XG4gIGlmIChPYmplY3QocHJveHkuJHBhcmVudCkgPT09IHByb3h5LiRwYXJlbnQpIHtcbiAgICByZXR1cm4gcHJveHkuJHBhcmVudFxuICB9XG5cbiAgbGV0IHsgcGFyZW50IH0gPSBwcm94eS4kXG5cbiAgd2hpbGUgKE9iamVjdChwYXJlbnQpID09PSBwYXJlbnQpIHtcbiAgICBpZiAoT2JqZWN0KHBhcmVudC5wcm94eSkgPT09IHBhcmVudC5wcm94eSkge1xuICAgICAgcmV0dXJuIHBhcmVudC5wcm94eVxuICAgIH1cblxuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRcbiAgfVxufVxuXG5mdW5jdGlvbiBmaWxsTm9ybWFsaXplZFZOb2RlcyAoY2hpbGRyZW4sIHZub2RlKSB7XG4gIGlmICh0eXBlb2Ygdm5vZGUudHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2bm9kZS5jaGlsZHJlbikgPT09IHRydWUpIHtcbiAgICAgIHZub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBmaWxsTm9ybWFsaXplZFZOb2RlcyhjaGlsZHJlbiwgY2hpbGQpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBjaGlsZHJlbi5hZGQodm5vZGUpXG4gIH1cbn1cblxuLy8gdm5vZGVzIGZyb20gcmVuZGVyZWQgaW4gYWR2YW5jZWQgc2xvdHNcbmV4cG9ydCBmdW5jdGlvbiBnZXROb3JtYWxpemVkVk5vZGVzICh2bm9kZXMpIHtcbiAgY29uc3QgY2hpbGRyZW4gPSBuZXcgU2V0KClcblxuICB2bm9kZXMuZm9yRWFjaCh2bm9kZSA9PiB7XG4gICAgZmlsbE5vcm1hbGl6ZWRWTm9kZXMoY2hpbGRyZW4sIHZub2RlKVxuICB9KVxuXG4gIHJldHVybiBBcnJheS5mcm9tKGNoaWxkcmVuKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdm1IYXNSb3V0ZXIgKHZtKSB7XG4gIHJldHVybiB2bS5hcHBDb250ZXh0LmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRyb3V0ZXIgIT09IHZvaWQgMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gdm1Jc0Rlc3Ryb3llZCAodm0pIHtcbiAgcmV0dXJuIHZtLmlzVW5tb3VudGVkID09PSB0cnVlIHx8IHZtLmlzRGVhY3RpdmF0ZWQgPT09IHRydWVcbn1cbiIsIi8qXG4gKiBJbnNwaXJlZCBieSBSb3V0ZXJMaW5rIGZyb20gVnVlIFJvdXRlclxuICogIC0tPiBBUEkgc2hvdWxkIG1hdGNoIVxuICovXG5cbmltcG9ydCB7IGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHZtSGFzUm91dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bS5qcydcblxuLy8gR2V0IHRoZSBvcmlnaW5hbCBwYXRoIHZhbHVlIG9mIGEgcmVjb3JkIGJ5IGZvbGxvd2luZyBpdHMgYWxpYXNPZlxuZnVuY3Rpb24gZ2V0T3JpZ2luYWxQYXRoIChyZWNvcmQpIHtcbiAgcmV0dXJuIHJlY29yZFxuICAgID8gKFxuICAgICAgICByZWNvcmQuYWxpYXNPZlxuICAgICAgICAgID8gcmVjb3JkLmFsaWFzT2YucGF0aFxuICAgICAgICAgIDogcmVjb3JkLnBhdGhcbiAgICAgICkgOiAnJ1xufVxuXG5mdW5jdGlvbiBpc1NhbWVSb3V0ZVJlY29yZCAoYSwgYikge1xuICAvLyBzaW5jZSB0aGUgb3JpZ2luYWwgcmVjb3JkIGhhcyBhbiB1bmRlZmluZWQgdmFsdWUgZm9yIGFsaWFzT2ZcbiAgLy8gYnV0IGFsbCBhbGlhc2VzIHBvaW50IHRvIHRoZSBvcmlnaW5hbCByZWNvcmQsIHRoaXMgd2lsbCBhbHdheXMgY29tcGFyZVxuICAvLyB0aGUgb3JpZ2luYWwgcmVjb3JkXG4gIHJldHVybiAoYS5hbGlhc09mIHx8IGEpID09PSAoYi5hbGlhc09mIHx8IGIpXG59XG5cbmZ1bmN0aW9uIGluY2x1ZGVzUGFyYW1zIChvdXRlciwgaW5uZXIpIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gaW5uZXIpIHtcbiAgICBjb25zdFxuICAgICAgaW5uZXJWYWx1ZSA9IGlubmVyWyBrZXkgXSxcbiAgICAgIG91dGVyVmFsdWUgPSBvdXRlclsga2V5IF1cblxuICAgIGlmICh0eXBlb2YgaW5uZXJWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpbm5lclZhbHVlICE9PSBvdXRlclZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIEFycmF5LmlzQXJyYXkob3V0ZXJWYWx1ZSkgPT09IGZhbHNlXG4gICAgICB8fCBvdXRlclZhbHVlLmxlbmd0aCAhPT0gaW5uZXJWYWx1ZS5sZW5ndGhcbiAgICAgIHx8IGlubmVyVmFsdWUuc29tZSgodmFsdWUsIGkpID0+IHZhbHVlICE9PSBvdXRlclZhbHVlWyBpIF0pXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBpc0VxdWl2YWxlbnRBcnJheSAoYSwgYikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShiKSA9PT0gdHJ1ZVxuICAgID8gYS5sZW5ndGggPT09IGIubGVuZ3RoICYmIGEuZXZlcnkoKHZhbHVlLCBpKSA9PiB2YWx1ZSA9PT0gYlsgaSBdKVxuICAgIDogYS5sZW5ndGggPT09IDEgJiYgYVsgMCBdID09PSBiXG59XG5cbmZ1bmN0aW9uIGlzU2FtZVJvdXRlTG9jYXRpb25QYXJhbXNWYWx1ZSAoYSwgYikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhKSA9PT0gdHJ1ZVxuICAgID8gaXNFcXVpdmFsZW50QXJyYXkoYSwgYilcbiAgICA6IChcbiAgICAgICAgQXJyYXkuaXNBcnJheShiKSA9PT0gdHJ1ZVxuICAgICAgICAgID8gaXNFcXVpdmFsZW50QXJyYXkoYiwgYSlcbiAgICAgICAgICA6IGEgPT09IGJcbiAgICAgIClcbn1cblxuZnVuY3Rpb24gaXNTYW1lUm91dGVMb2NhdGlvblBhcmFtcyAoYSwgYikge1xuICBpZiAoT2JqZWN0LmtleXMoYSkubGVuZ3RoICE9PSBPYmplY3Qua2V5cyhiKS5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGZvciAoY29uc3Qga2V5IGluIGEpIHtcbiAgICBpZiAoaXNTYW1lUm91dGVMb2NhdGlvblBhcmFtc1ZhbHVlKGFbIGtleSBdLCBiWyBrZXkgXSkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgY29uc3QgdXNlUm91dGVyTGlua1Byb3BzID0ge1xuICAvLyByb3V0ZXItbGlua1xuICB0bzogWyBTdHJpbmcsIE9iamVjdCBdLFxuICByZXBsYWNlOiBCb29sZWFuLFxuICBleGFjdDogQm9vbGVhbixcbiAgYWN0aXZlQ2xhc3M6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ3Etcm91dGVyLWxpbmstLWFjdGl2ZSdcbiAgfSxcbiAgZXhhY3RBY3RpdmVDbGFzczoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAncS1yb3V0ZXItbGluay0tZXhhY3QtYWN0aXZlJ1xuICB9LFxuXG4gIC8vIHJlZ3VsYXIgPGE+IGxpbmtcbiAgaHJlZjogU3RyaW5nLFxuICB0YXJnZXQ6IFN0cmluZyxcblxuICAvLyBzdGF0ZVxuICBkaXNhYmxlOiBCb29sZWFuXG59XG5cbi8vIGV4dGVybmFsIHByb3BzOiB0eXBlLCB0YWdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgZmFsbGJhY2tUYWcsIHVzZURpc2FibGVGb3JSb3V0ZXJMaW5rUHJvcHMgPSB0cnVlIH0gPSB7fSkge1xuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgcHJvcHMsIHByb3h5LCBlbWl0IH0gPSB2bVxuXG4gIGNvbnN0IGhhc1JvdXRlciA9IHZtSGFzUm91dGVyKHZtKVxuICBjb25zdCBoYXNIcmVmTGluayA9IGNvbXB1dGVkKCgpID0+IHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgcHJvcHMuaHJlZiAhPT0gdm9pZCAwKVxuXG4gIC8vIGZvciBwZXJmIHJlYXNvbnMsIHdlIHVzZSBtaW5pbXVtIGFtb3VudCBvZiBydW50aW1lIHdvcmtcbiAgY29uc3QgaGFzUm91dGVyTGlua1Byb3BzID0gdXNlRGlzYWJsZUZvclJvdXRlckxpbmtQcm9wcyA9PT0gdHJ1ZVxuICAgID8gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGhhc1JvdXRlciA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZVxuICAgICAgJiYgaGFzSHJlZkxpbmsudmFsdWUgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnRvICE9PSB2b2lkIDAgJiYgcHJvcHMudG8gIT09IG51bGwgJiYgcHJvcHMudG8gIT09ICcnXG4gICAgKVxuICAgIDogY29tcHV0ZWQoKCkgPT5cbiAgICAgIGhhc1JvdXRlciA9PT0gdHJ1ZVxuICAgICAgJiYgaGFzSHJlZkxpbmsudmFsdWUgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnRvICE9PSB2b2lkIDAgJiYgcHJvcHMudG8gIT09IG51bGwgJiYgcHJvcHMudG8gIT09ICcnXG4gICAgKVxuXG4gIGNvbnN0IHJlc29sdmVkTGluayA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBoYXNSb3V0ZXJMaW5rUHJvcHMudmFsdWUgPT09IHRydWVcbiAgICAgID8gZ2V0TGluayhwcm9wcy50bylcbiAgICAgIDogbnVsbFxuICApKVxuXG4gIGNvbnN0IGhhc1JvdXRlckxpbmsgPSBjb21wdXRlZCgoKSA9PiByZXNvbHZlZExpbmsudmFsdWUgIT09IG51bGwpXG4gIGNvbnN0IGhhc0xpbmsgPSBjb21wdXRlZCgoKSA9PiBoYXNIcmVmTGluay52YWx1ZSA9PT0gdHJ1ZSB8fCBoYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKVxuXG4gIGNvbnN0IGxpbmtUYWcgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMudHlwZSA9PT0gJ2EnIHx8IGhhc0xpbmsudmFsdWUgPT09IHRydWVcbiAgICAgID8gJ2EnXG4gICAgICA6IChwcm9wcy50YWcgfHwgZmFsbGJhY2tUYWcgfHwgJ2RpdicpXG4gICkpXG5cbiAgY29uc3QgbGlua0F0dHJzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGhhc0hyZWZMaW5rLnZhbHVlID09PSB0cnVlXG4gICAgICA/IHtcbiAgICAgICAgICBocmVmOiBwcm9wcy5ocmVmLFxuICAgICAgICAgIHRhcmdldDogcHJvcHMudGFyZ2V0XG4gICAgICAgIH1cbiAgICAgIDogKFxuICAgICAgICAgIGhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGhyZWY6IHJlc29sdmVkTGluay52YWx1ZS5ocmVmLFxuICAgICAgICAgICAgICAgIHRhcmdldDogcHJvcHMudGFyZ2V0XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDoge31cbiAgICAgICAgKVxuICApKVxuXG4gIGNvbnN0IGxpbmtBY3RpdmVJbmRleCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAoaGFzUm91dGVyTGluay52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGNvbnN0XG4gICAgICB7IG1hdGNoZWQgfSA9IHJlc29sdmVkTGluay52YWx1ZSxcbiAgICAgIHsgbGVuZ3RoIH0gPSBtYXRjaGVkLFxuICAgICAgcm91dGVNYXRjaGVkID0gbWF0Y2hlZFsgbGVuZ3RoIC0gMSBdXG5cbiAgICBpZiAocm91dGVNYXRjaGVkID09PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRNYXRjaGVkID0gcHJveHkuJHJvdXRlLm1hdGNoZWRcblxuICAgIGlmIChjdXJyZW50TWF0Y2hlZC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gY3VycmVudE1hdGNoZWQuZmluZEluZGV4KFxuICAgICAgaXNTYW1lUm91dGVSZWNvcmQuYmluZChudWxsLCByb3V0ZU1hdGNoZWQpXG4gICAgKVxuXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxuICAgIC8vIHBvc3NpYmxlIHBhcmVudCByZWNvcmRcbiAgICBjb25zdCBwYXJlbnRSZWNvcmRQYXRoID0gZ2V0T3JpZ2luYWxQYXRoKG1hdGNoZWRbIGxlbmd0aCAtIDIgXSlcblxuICAgIHJldHVybiAoXG4gICAgICAvLyB3ZSBhcmUgZGVhbGluZyB3aXRoIG5lc3RlZCByb3V0ZXNcbiAgICAgIGxlbmd0aCA+IDFcbiAgICAgIC8vIGlmIHRoZSBwYXJlbnQgYW5kIG1hdGNoZWQgcm91dGUgaGF2ZSB0aGUgc2FtZSBwYXRoLCB0aGlzIGxpbmsgaXNcbiAgICAgIC8vIHJlZmVycmluZyB0byB0aGUgZW1wdHkgY2hpbGQuIE9yIHdlIGN1cnJlbnRseSBhcmUgb24gYSBkaWZmZXJlbnRcbiAgICAgIC8vIGNoaWxkIG9mIHRoZSBzYW1lIHBhcmVudFxuICAgICAgJiYgZ2V0T3JpZ2luYWxQYXRoKHJvdXRlTWF0Y2hlZCkgPT09IHBhcmVudFJlY29yZFBhdGhcbiAgICAgIC8vIGF2b2lkIGNvbXBhcmluZyB0aGUgY2hpbGQgd2l0aCBpdHMgcGFyZW50XG4gICAgICAmJiBjdXJyZW50TWF0Y2hlZFsgY3VycmVudE1hdGNoZWQubGVuZ3RoIC0gMSBdLnBhdGggIT09IHBhcmVudFJlY29yZFBhdGhcbiAgICAgICAgPyBjdXJyZW50TWF0Y2hlZC5maW5kSW5kZXgoXG4gICAgICAgICAgaXNTYW1lUm91dGVSZWNvcmQuYmluZChudWxsLCBtYXRjaGVkWyBsZW5ndGggLSAyIF0pXG4gICAgICAgIClcbiAgICAgICAgOiBpbmRleFxuICAgIClcbiAgfSlcblxuICBjb25zdCBsaW5rSXNBY3RpdmUgPSBjb21wdXRlZCgoKSA9PlxuICAgIGhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWVcbiAgICAmJiBsaW5rQWN0aXZlSW5kZXgudmFsdWUgIT09IC0xXG4gICAgJiYgaW5jbHVkZXNQYXJhbXMocHJveHkuJHJvdXRlLnBhcmFtcywgcmVzb2x2ZWRMaW5rLnZhbHVlLnBhcmFtcylcbiAgKVxuXG4gIGNvbnN0IGxpbmtJc0V4YWN0QWN0aXZlID0gY29tcHV0ZWQoKCkgPT5cbiAgICBsaW5rSXNBY3RpdmUudmFsdWUgPT09IHRydWVcbiAgICAgICYmIGxpbmtBY3RpdmVJbmRleC52YWx1ZSA9PT0gcHJveHkuJHJvdXRlLm1hdGNoZWQubGVuZ3RoIC0gMVxuICAgICAgJiYgaXNTYW1lUm91dGVMb2NhdGlvblBhcmFtcyhwcm94eS4kcm91dGUucGFyYW1zLCByZXNvbHZlZExpbmsudmFsdWUucGFyYW1zKVxuICApXG5cbiAgY29uc3QgbGlua0NsYXNzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWVcbiAgICAgID8gKFxuICAgICAgICAgIGxpbmtJc0V4YWN0QWN0aXZlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IGAgJHsgcHJvcHMuZXhhY3RBY3RpdmVDbGFzcyB9ICR7IHByb3BzLmFjdGl2ZUNsYXNzIH1gXG4gICAgICAgICAgICA6IChcbiAgICAgICAgICAgICAgICBwcm9wcy5leGFjdCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgICAgICAgOiAobGlua0lzQWN0aXZlLnZhbHVlID09PSB0cnVlID8gYCAkeyBwcm9wcy5hY3RpdmVDbGFzcyB9YCA6ICcnKVxuICAgICAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIDogJydcbiAgKSlcblxuICBmdW5jdGlvbiBnZXRMaW5rICh0bykge1xuICAgIHRyeSB7IHJldHVybiBwcm94eS4kcm91dGVyLnJlc29sdmUodG8pIH1cbiAgICBjYXRjaCAoXykge31cblxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgUHJvbWlzZTxSb3V0ZXJFcnJvciB8IGZhbHNlIHwgdW5kZWZpbmVkPlxuICAgKi9cbiAgZnVuY3Rpb24gbmF2aWdhdGVUb1JvdXRlckxpbmsgKFxuICAgIGUsXG4gICAgeyByZXR1cm5Sb3V0ZXJFcnJvciwgdG8gPSBwcm9wcy50bywgcmVwbGFjZSA9IHByb3BzLnJlcGxhY2UgfSA9IHt9XG4gICkge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICAvLyBlbnN1cmUgbmF0aXZlIG5hdmlnYXRpb24gaXMgcHJldmVudGVkIGluIGFsbCBjYXNlcyxcbiAgICAgIC8vIGxpa2Ugd2hlbiB1c2VEaXNhYmxlRm9yUm91dGVyTGlua1Byb3BzID09PSBmYWxzZSAoUVJvdXRlVGFiKVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIC8vIGRvbid0IHJlZGlyZWN0IHdpdGggY29udHJvbCBrZXlzO1xuICAgICAgLy8gc2hvdWxkIG1hdGNoIFJvdXRlckxpbmsgZnJvbSBWdWUgUm91dGVyXG4gICAgICBlLm1ldGFLZXkgfHwgZS5hbHRLZXkgfHwgZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXlcblxuICAgICAgLy8gZG9uJ3QgcmVkaXJlY3Qgb24gcmlnaHQgY2xpY2tcbiAgICAgIHx8IChlLmJ1dHRvbiAhPT0gdm9pZCAwICYmIGUuYnV0dG9uICE9PSAwKVxuXG4gICAgICAvLyBkb24ndCByZWRpcmVjdCBpZiBpdCBzaG91bGQgb3BlbiBpbiBhIG5ldyB3aW5kb3dcbiAgICAgIHx8IHByb3BzLnRhcmdldCA9PT0gJ19ibGFuaydcbiAgICApIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpXG4gICAgfVxuXG4gICAgLy8gaGluZGVyIHRoZSBuYXRpdmUgbmF2aWdhdGlvblxuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgLy8gdGhlbigpIGNhbiBhbHNvIHJldHVybiBhIFwic29mdFwiIHJvdXRlciBlcnJvciAoVnVlIFJvdXRlciBiZWhhdmlvcilcbiAgICBjb25zdCBwcm9taXNlID0gcHJveHkuJHJvdXRlclsgcmVwbGFjZSA9PT0gdHJ1ZSA/ICdyZXBsYWNlJyA6ICdwdXNoJyBdKHRvKVxuXG4gICAgcmV0dXJuIHJldHVyblJvdXRlckVycm9yID09PSB0cnVlXG4gICAgICA/IHByb21pc2VcbiAgICAgIC8vIGVsc2UgY2F0Y2hpbmcgaGFyZCBlcnJvcnMgYW5kIGFsc28gXCJzb2Z0XCIgb25lcyAtIHRoZW4oZXJyID0+IC4uLilcbiAgICAgIDogcHJvbWlzZS50aGVuKCgpID0+IHt9KS5jYXRjaCgoKSA9PiB7fSlcbiAgfVxuXG4gIC8vIHdhcm5pbmchIGVuc3VyZSB0aGF0IHRoZSBjb21wb25lbnQgdXNpbmcgaXQgaGFzICdjbGljaycgaW5jbHVkZWQgaW4gaXRzICdlbWl0cycgZGVmaW5pdGlvbiBwcm9wXG4gIGZ1bmN0aW9uIG5hdmlnYXRlT25DbGljayAoZSkge1xuICAgIGlmIChoYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBnbyA9IG9wdHMgPT4gbmF2aWdhdGVUb1JvdXRlckxpbmsoZSwgb3B0cylcblxuICAgICAgZW1pdCgnY2xpY2snLCBlLCBnbylcbiAgICAgIGUuZGVmYXVsdFByZXZlbnRlZCAhPT0gdHJ1ZSAmJiBnbygpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaGFzUm91dGVyTGluayxcbiAgICBoYXNIcmVmTGluayxcbiAgICBoYXNMaW5rLFxuXG4gICAgbGlua1RhZyxcbiAgICByZXNvbHZlZExpbmssXG4gICAgbGlua0lzQWN0aXZlLFxuICAgIGxpbmtJc0V4YWN0QWN0aXZlLFxuICAgIGxpbmtDbGFzcyxcbiAgICBsaW5rQXR0cnMsXG5cbiAgICBnZXRMaW5rLFxuICAgIG5hdmlnYXRlVG9Sb3V0ZXJMaW5rLFxuICAgIG5hdmlnYXRlT25DbGlja1xuICB9XG59XG4iXSwibmFtZXMiOlsibWF0Y2hlcyJdLCJtYXBwaW5ncyI6IjtBQUVPLE1BQU0s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
