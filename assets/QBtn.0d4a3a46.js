import { I as unref, m as isKeyCode, J as addEvt, K as cleanEvt, L as stop, M as position, c as computed, r as ref, a as onBeforeUnmount, h, k as withDirectives, g as getCurrentInstance, s as stopAndPrevent, T as Transition, l as listenOpts, N as prevent } from "./index.40a16a13.js";
import { e as createDirective, f as useSizeProps, u as useRouterLinkProps, g as useSize, d as useRouterLink, c as createComponent, Q as QIcon, b as hMergeSlot, i as QSpinner } from "./use-router-link.ba6d1dac.js";
function css(element, css2) {
  const style = element.style;
  for (const prop in css2) {
    style[prop] = css2[prop];
  }
}
function getElement(el) {
  if (el === void 0 || el === null) {
    return void 0;
  }
  if (typeof el === "string") {
    try {
      return document.querySelector(el) || void 0;
    } catch (err) {
      return void 0;
    }
  }
  const target = unref(el);
  if (target) {
    return target.$el || target;
  }
}
function throttle(fn, limit = 250) {
  let wait = false, result;
  return function() {
    if (wait === false) {
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
      result = fn.apply(this, arguments);
    }
    return result;
  };
}
function showRipple(evt, el, ctx, forceCenter) {
  ctx.modifiers.stop === true && stop(evt);
  const color = ctx.modifiers.color;
  let center = ctx.modifiers.center;
  center = center === true || forceCenter === true;
  const node = document.createElement("span"), innerNode = document.createElement("span"), pos = position(evt), { left, top, width, height } = el.getBoundingClientRect(), diameter = Math.sqrt(width * width + height * height), radius = diameter / 2, centerX = `${(width - diameter) / 2}px`, x = center ? centerX : `${pos.left - left - radius}px`, centerY = `${(height - diameter) / 2}px`, y = center ? centerY : `${pos.top - top - radius}px`;
  innerNode.className = "q-ripple__inner";
  css(innerNode, {
    height: `${diameter}px`,
    width: `${diameter}px`,
    transform: `translate3d(${x},${y},0) scale3d(.2,.2,1)`,
    opacity: 0
  });
  node.className = `q-ripple${color ? " text-" + color : ""}`;
  node.setAttribute("dir", "ltr");
  node.appendChild(innerNode);
  el.appendChild(node);
  const abort = () => {
    node.remove();
    clearTimeout(timer);
  };
  ctx.abort.push(abort);
  let timer = setTimeout(() => {
    innerNode.classList.add("q-ripple__inner--enter");
    innerNode.style.transform = `translate3d(${centerX},${centerY},0) scale3d(1,1,1)`;
    innerNode.style.opacity = 0.2;
    timer = setTimeout(() => {
      innerNode.classList.remove("q-ripple__inner--enter");
      innerNode.classList.add("q-ripple__inner--leave");
      innerNode.style.opacity = 0;
      timer = setTimeout(() => {
        node.remove();
        ctx.abort.splice(ctx.abort.indexOf(abort), 1);
      }, 275);
    }, 250);
  }, 50);
}
function updateModifiers(ctx, { modifiers, value, arg }) {
  const cfg = Object.assign({}, ctx.cfg.ripple, modifiers, value);
  ctx.modifiers = {
    early: cfg.early === true,
    stop: cfg.stop === true,
    center: cfg.center === true,
    color: cfg.color || arg,
    keyCodes: [].concat(cfg.keyCodes || 13)
  };
}
var Ripple = createDirective(
  {
    name: "ripple",
    beforeMount(el, binding) {
      const cfg = binding.instance.$.appContext.config.globalProperties.$q.config || {};
      if (cfg.ripple === false) {
        return;
      }
      const ctx = {
        cfg,
        enabled: binding.value !== false,
        modifiers: {},
        abort: [],
        start(evt) {
          if (ctx.enabled === true && evt.qSkipRipple !== true && evt.type === (ctx.modifiers.early === true ? "pointerdown" : "click")) {
            showRipple(evt, el, ctx, evt.qKeyEvent === true);
          }
        },
        keystart: throttle((evt) => {
          if (ctx.enabled === true && evt.qSkipRipple !== true && isKeyCode(evt, ctx.modifiers.keyCodes) === true && evt.type === `key${ctx.modifiers.early === true ? "down" : "up"}`) {
            showRipple(evt, el, ctx, true);
          }
        }, 300)
      };
      updateModifiers(ctx, binding);
      el.__qripple = ctx;
      addEvt(ctx, "main", [
        [el, "pointerdown", "start", "passive"],
        [el, "click", "start", "passive"],
        [el, "keydown", "keystart", "passive"],
        [el, "keyup", "keystart", "passive"]
      ]);
    },
    updated(el, binding) {
      if (binding.oldValue !== binding.value) {
        const ctx = el.__qripple;
        if (ctx !== void 0) {
          ctx.enabled = binding.value !== false;
          if (ctx.enabled === true && Object(binding.value) === binding.value) {
            updateModifiers(ctx, binding);
          }
        }
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qripple;
      if (ctx !== void 0) {
        ctx.abort.forEach((fn) => {
          fn();
        });
        cleanEvt(ctx, "main");
        delete el._qripple;
      }
    }
  }
);
const alignMap = {
  left: "start",
  center: "center",
  right: "end",
  between: "between",
  around: "around",
  evenly: "evenly",
  stretch: "stretch"
};
const alignValues = Object.keys(alignMap);
const useAlignProps = {
  align: {
    type: String,
    validator: (v) => alignValues.includes(v)
  }
};
function useAlign(props) {
  return computed(() => {
    const align = props.align === void 0 ? props.vertical === true ? "stretch" : "left" : props.align;
    return `${props.vertical === true ? "items" : "justify"}-${alignMap[align]}`;
  });
}
const btnPadding = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};
const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
const formTypes = ["button", "submit", "reset"];
const mediaTypeRE = /[^\s]\/[^\s]/;
const btnDesignOptions = ["flat", "outline", "push", "unelevated"];
const getBtnDesign = (props, defaultValue) => {
  if (props.flat === true)
    return "flat";
  if (props.outline === true)
    return "outline";
  if (props.push === true)
    return "push";
  if (props.unelevated === true)
    return "unelevated";
  return defaultValue;
};
const useBtnProps = {
  ...useSizeProps,
  ...useRouterLinkProps,
  type: {
    type: String,
    default: "button"
  },
  label: [Number, String],
  icon: String,
  iconRight: String,
  ...btnDesignOptions.reduce(
    (acc, val) => (acc[val] = Boolean) && acc,
    {}
  ),
  square: Boolean,
  round: Boolean,
  rounded: Boolean,
  glossy: Boolean,
  size: String,
  fab: Boolean,
  fabMini: Boolean,
  padding: String,
  color: String,
  textColor: String,
  noCaps: Boolean,
  noWrap: Boolean,
  dense: Boolean,
  tabindex: [Number, String],
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  align: {
    ...useAlignProps.align,
    default: "center"
  },
  stack: Boolean,
  stretch: Boolean,
  loading: {
    type: Boolean,
    default: null
  },
  disable: Boolean
};
function useBtn(props) {
  const sizeStyle = useSize(props, defaultSizes);
  const alignClass = useAlign(props);
  const { hasRouterLink, hasLink, linkTag, linkAttrs, navigateOnClick } = useRouterLink({
    fallbackTag: "button"
  });
  const style = computed(() => {
    const obj = props.fab === false && props.fabMini === false ? sizeStyle.value : {};
    return props.padding !== void 0 ? Object.assign({}, obj, {
      padding: props.padding.split(/\s+/).map((v) => v in btnPadding ? btnPadding[v] + "px" : v).join(" "),
      minWidth: "0",
      minHeight: "0"
    }) : obj;
  });
  const isRounded = computed(
    () => props.rounded === true || props.fab === true || props.fabMini === true
  );
  const isActionable = computed(
    () => props.disable !== true && props.loading !== true
  );
  const tabIndex = computed(() => isActionable.value === true ? props.tabindex || 0 : -1);
  const design = computed(() => getBtnDesign(props, "standard"));
  const attributes = computed(() => {
    const acc = { tabindex: tabIndex.value };
    if (hasLink.value === true) {
      Object.assign(acc, linkAttrs.value);
    } else if (formTypes.includes(props.type) === true) {
      acc.type = props.type;
    }
    if (linkTag.value === "a") {
      if (props.disable === true) {
        acc["aria-disabled"] = "true";
      } else if (acc.href === void 0) {
        acc.role = "button";
      }
      if (hasRouterLink.value !== true && mediaTypeRE.test(props.type) === true) {
        acc.type = props.type;
      }
    } else if (props.disable === true) {
      acc.disabled = "";
      acc["aria-disabled"] = "true";
    }
    if (props.loading === true && props.percentage !== void 0) {
      Object.assign(acc, {
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": props.percentage
      });
    }
    return acc;
  });
  const classes = computed(() => {
    let colors;
    if (props.color !== void 0) {
      if (props.flat === true || props.outline === true) {
        colors = `text-${props.textColor || props.color}`;
      } else {
        colors = `bg-${props.color} text-${props.textColor || "white"}`;
      }
    } else if (props.textColor) {
      colors = `text-${props.textColor}`;
    }
    const shape = props.round === true ? "round" : `rectangle${isRounded.value === true ? " q-btn--rounded" : props.square === true ? " q-btn--square" : ""}`;
    return `q-btn--${design.value} q-btn--${shape}` + (colors !== void 0 ? " " + colors : "") + (isActionable.value === true ? " q-btn--actionable q-focusable q-hoverable" : props.disable === true ? " disabled" : "") + (props.fab === true ? " q-btn--fab" : props.fabMini === true ? " q-btn--fab-mini" : "") + (props.noCaps === true ? " q-btn--no-uppercase" : "") + (props.dense === true ? " q-btn--dense" : "") + (props.stretch === true ? " no-border-radius self-stretch" : "") + (props.glossy === true ? " glossy" : "") + (props.square ? " q-btn--square" : "");
  });
  const innerClasses = computed(
    () => alignClass.value + (props.stack === true ? " column" : " row") + (props.noWrap === true ? " no-wrap text-no-wrap" : "") + (props.loading === true ? " q-btn__content--hidden" : "")
  );
  return {
    classes,
    style,
    innerClasses,
    attributes,
    hasLink,
    linkTag,
    navigateOnClick,
    isActionable
  };
}
const { passiveCapture } = listenOpts;
let touchTarget = null, keyboardTarget = null, mouseTarget = null;
var QBtn = createComponent({
  name: "QBtn",
  props: {
    ...useBtnProps,
    percentage: Number,
    darkPercentage: Boolean,
    onTouchstart: [Function, Array]
  },
  emits: ["click", "keydown", "mousedown", "keyup"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const {
      classes,
      style,
      innerClasses,
      attributes,
      hasLink,
      linkTag,
      navigateOnClick,
      isActionable
    } = useBtn(props);
    const rootRef = ref(null);
    const blurTargetRef = ref(null);
    let localTouchTargetEl = null, avoidMouseRipple, mouseTimer = null;
    const hasLabel = computed(
      () => props.label !== void 0 && props.label !== null && props.label !== ""
    );
    const ripple = computed(() => props.disable === true || props.ripple === false ? false : {
      keyCodes: hasLink.value === true ? [13, 32] : [13],
      ...props.ripple === true ? {} : props.ripple
    });
    const rippleProps = computed(() => ({ center: props.round }));
    const percentageStyle = computed(() => {
      const val = Math.max(0, Math.min(100, props.percentage));
      return val > 0 ? { transition: "transform 0.6s", transform: `translateX(${val - 100}%)` } : {};
    });
    const onEvents = computed(() => {
      if (props.loading === true) {
        return {
          onMousedown: onLoadingEvt,
          onTouchstart: onLoadingEvt,
          onClick: onLoadingEvt,
          onKeydown: onLoadingEvt,
          onKeyup: onLoadingEvt
        };
      }
      if (isActionable.value === true) {
        const acc = {
          onClick,
          onKeydown,
          onMousedown
        };
        if (proxy.$q.platform.has.touch === true) {
          const suffix = props.onTouchstart !== void 0 ? "" : "Passive";
          acc[`onTouchstart${suffix}`] = onTouchstart;
        }
        return acc;
      }
      return {
        onClick: stopAndPrevent
      };
    });
    const nodeProps = computed(() => ({
      ref: rootRef,
      class: "q-btn q-btn-item non-selectable no-outline " + classes.value,
      style: style.value,
      ...attributes.value,
      ...onEvents.value
    }));
    function onClick(e) {
      if (rootRef.value === null) {
        return;
      }
      if (e !== void 0) {
        if (e.defaultPrevented === true) {
          return;
        }
        const el = document.activeElement;
        if (props.type === "submit" && el !== document.body && rootRef.value.contains(el) === false && el.contains(rootRef.value) === false) {
          rootRef.value.focus();
          const onClickCleanup = () => {
            document.removeEventListener("keydown", stopAndPrevent, true);
            document.removeEventListener("keyup", onClickCleanup, passiveCapture);
            rootRef.value !== null && rootRef.value.removeEventListener("blur", onClickCleanup, passiveCapture);
          };
          document.addEventListener("keydown", stopAndPrevent, true);
          document.addEventListener("keyup", onClickCleanup, passiveCapture);
          rootRef.value.addEventListener("blur", onClickCleanup, passiveCapture);
        }
      }
      navigateOnClick(e);
    }
    function onKeydown(e) {
      if (rootRef.value === null) {
        return;
      }
      emit("keydown", e);
      if (isKeyCode(e, [13, 32]) === true && keyboardTarget !== rootRef.value) {
        keyboardTarget !== null && cleanup();
        if (e.defaultPrevented !== true) {
          rootRef.value.focus();
          keyboardTarget = rootRef.value;
          rootRef.value.classList.add("q-btn--active");
          document.addEventListener("keyup", onPressEnd, true);
          rootRef.value.addEventListener("blur", onPressEnd, passiveCapture);
        }
        stopAndPrevent(e);
      }
    }
    function onTouchstart(e) {
      if (rootRef.value === null) {
        return;
      }
      emit("touchstart", e);
      if (e.defaultPrevented === true) {
        return;
      }
      if (touchTarget !== rootRef.value) {
        touchTarget !== null && cleanup();
        touchTarget = rootRef.value;
        localTouchTargetEl = e.target;
        localTouchTargetEl.addEventListener("touchcancel", onPressEnd, passiveCapture);
        localTouchTargetEl.addEventListener("touchend", onPressEnd, passiveCapture);
      }
      avoidMouseRipple = true;
      mouseTimer !== null && clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        mouseTimer = null;
        avoidMouseRipple = false;
      }, 200);
    }
    function onMousedown(e) {
      if (rootRef.value === null) {
        return;
      }
      e.qSkipRipple = avoidMouseRipple === true;
      emit("mousedown", e);
      if (e.defaultPrevented !== true && mouseTarget !== rootRef.value) {
        mouseTarget !== null && cleanup();
        mouseTarget = rootRef.value;
        rootRef.value.classList.add("q-btn--active");
        document.addEventListener("mouseup", onPressEnd, passiveCapture);
      }
    }
    function onPressEnd(e) {
      if (rootRef.value === null) {
        return;
      }
      if (e !== void 0 && e.type === "blur" && document.activeElement === rootRef.value) {
        return;
      }
      if (e !== void 0 && e.type === "keyup") {
        if (keyboardTarget === rootRef.value && isKeyCode(e, [13, 32]) === true) {
          const evt = new MouseEvent("click", e);
          evt.qKeyEvent = true;
          e.defaultPrevented === true && prevent(evt);
          e.cancelBubble === true && stop(evt);
          rootRef.value.dispatchEvent(evt);
          stopAndPrevent(e);
          e.qKeyEvent = true;
        }
        emit("keyup", e);
      }
      cleanup();
    }
    function cleanup(destroying) {
      const blurTarget = blurTargetRef.value;
      if (destroying !== true && (touchTarget === rootRef.value || mouseTarget === rootRef.value) && blurTarget !== null && blurTarget !== document.activeElement) {
        blurTarget.setAttribute("tabindex", -1);
        blurTarget.focus();
      }
      if (touchTarget === rootRef.value) {
        if (localTouchTargetEl !== null) {
          localTouchTargetEl.removeEventListener("touchcancel", onPressEnd, passiveCapture);
          localTouchTargetEl.removeEventListener("touchend", onPressEnd, passiveCapture);
        }
        touchTarget = localTouchTargetEl = null;
      }
      if (mouseTarget === rootRef.value) {
        document.removeEventListener("mouseup", onPressEnd, passiveCapture);
        mouseTarget = null;
      }
      if (keyboardTarget === rootRef.value) {
        document.removeEventListener("keyup", onPressEnd, true);
        rootRef.value !== null && rootRef.value.removeEventListener("blur", onPressEnd, passiveCapture);
        keyboardTarget = null;
      }
      rootRef.value !== null && rootRef.value.classList.remove("q-btn--active");
    }
    function onLoadingEvt(evt) {
      stopAndPrevent(evt);
      evt.qSkipRipple = true;
    }
    onBeforeUnmount(() => {
      cleanup(true);
    });
    Object.assign(proxy, { click: onClick });
    return () => {
      let inner = [];
      props.icon !== void 0 && inner.push(
        h(QIcon, {
          name: props.icon,
          left: props.stack === false && hasLabel.value === true,
          role: "img",
          "aria-hidden": "true"
        })
      );
      hasLabel.value === true && inner.push(
        h("span", { class: "block" }, [props.label])
      );
      inner = hMergeSlot(slots.default, inner);
      if (props.iconRight !== void 0 && props.round === false) {
        inner.push(
          h(QIcon, {
            name: props.iconRight,
            right: props.stack === false && hasLabel.value === true,
            role: "img",
            "aria-hidden": "true"
          })
        );
      }
      const child = [
        h("span", {
          class: "q-focus-helper",
          ref: blurTargetRef
        })
      ];
      if (props.loading === true && props.percentage !== void 0) {
        child.push(
          h("span", {
            class: "q-btn__progress absolute-full overflow-hidden" + (props.darkPercentage === true ? " q-btn__progress--dark" : "")
          }, [
            h("span", {
              class: "q-btn__progress-indicator fit block",
              style: percentageStyle.value
            })
          ])
        );
      }
      child.push(
        h("span", {
          class: "q-btn__content text-center col items-center q-anchor--skip " + innerClasses.value
        }, inner)
      );
      props.loading !== null && child.push(
        h(Transition, {
          name: "q-transition--fade"
        }, () => props.loading === true ? [
          h("span", {
            key: "loading",
            class: "absolute-full flex flex-center"
          }, slots.loading !== void 0 ? slots.loading() : [h(QSpinner)])
        ] : null)
      );
      return withDirectives(
        h(
          linkTag.value,
          nodeProps.value,
          child
        ),
        [[
          Ripple,
          ripple.value,
          void 0,
          rippleProps.value
        ]]
      );
    };
  }
});
export { QBtn as Q, Ripple as R, css as c, getElement as g };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUJ0bi4wZDRhM2E0Ni5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvZG9tLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvdGhyb3R0bGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9kaXJlY3RpdmVzL1JpcHBsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWFsaWduLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9idG4vdXNlLWJ0bi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvYnRuL1FCdG4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdW5yZWYgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXQgKGVsKSB7XG4gIGlmIChlbCA9PT0gd2luZG93KSB7XG4gICAgcmV0dXJuIHsgdG9wOiAwLCBsZWZ0OiAwIH1cbiAgfVxuICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgcmV0dXJuIHsgdG9wLCBsZWZ0IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlIChlbCwgcHJvcGVydHkpIHtcbiAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGVpZ2h0IChlbCkge1xuICByZXR1cm4gZWwgPT09IHdpbmRvd1xuICAgID8gd2luZG93LmlubmVySGVpZ2h0XG4gICAgOiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpZHRoIChlbCkge1xuICByZXR1cm4gZWwgPT09IHdpbmRvd1xuICAgID8gd2luZG93LmlubmVyV2lkdGhcbiAgICA6IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjc3MgKGVsZW1lbnQsIGNzcykge1xuICBjb25zdCBzdHlsZSA9IGVsZW1lbnQuc3R5bGVcblxuICBmb3IgKGNvbnN0IHByb3AgaW4gY3NzKSB7XG4gICAgc3R5bGVbIHByb3AgXSA9IGNzc1sgcHJvcCBdXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNzc0JhdGNoIChlbGVtZW50cywgc3R5bGUpIHtcbiAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiBjc3MoZWwsIHN0eWxlKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWR5IChmbikge1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gICAgcmV0dXJuIGZuKClcbiAgfVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbiwgZmFsc2UpXG59XG5cbi8vIGludGVybmFsXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudCAoZWwpIHtcbiAgaWYgKGVsID09PSB2b2lkIDAgfHwgZWwgPT09IG51bGwpIHtcbiAgICByZXR1cm4gdm9pZCAwXG4gIH1cblxuICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCkgfHwgdm9pZCAwXG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB2b2lkIDBcbiAgICB9XG4gIH1cblxuICBjb25zdCB0YXJnZXQgPSB1bnJlZihlbClcbiAgaWYgKHRhcmdldCkge1xuICAgIHJldHVybiB0YXJnZXQuJGVsIHx8IHRhcmdldFxuICB9XG59XG5cbi8vIGludGVybmFsXG5leHBvcnQgZnVuY3Rpb24gY2hpbGRIYXNGb2N1cyAoZWwsIGZvY3VzZWRFbCkge1xuICBpZiAoZWwgPT09IHZvaWQgMCB8fCBlbCA9PT0gbnVsbCB8fCBlbC5jb250YWlucyhmb2N1c2VkRWwpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZvciAobGV0IG5leHQgPSBlbC5uZXh0RWxlbWVudFNpYmxpbmc7IG5leHQgIT09IG51bGw7IG5leHQgPSBuZXh0Lm5leHRFbGVtZW50U2libGluZykge1xuICAgIGlmIChuZXh0LmNvbnRhaW5zKGZvY3VzZWRFbCkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb2Zmc2V0LFxuICBzdHlsZSxcbiAgaGVpZ2h0LFxuICB3aWR0aCxcbiAgY3NzLFxuICBjc3NCYXRjaCxcbiAgcmVhZHlcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmbiwgbGltaXQgPSAyNTApIHtcbiAgbGV0IHdhaXQgPSBmYWxzZSwgcmVzdWx0XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgaWYgKHdhaXQgPT09IGZhbHNlKSB7XG4gICAgICB3YWl0ID0gdHJ1ZVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHdhaXQgPSBmYWxzZSB9LCBsaW1pdClcbiAgICAgIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZURpcmVjdGl2ZSB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnLi4vdXRpbHMvZG9tLmpzJ1xuaW1wb3J0IHsgcG9zaXRpb24sIHN0b3AsIGFkZEV2dCwgY2xlYW5FdnQgfSBmcm9tICcuLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUva2V5LWNvbXBvc2l0aW9uLmpzJ1xuaW1wb3J0IHRocm90dGxlIGZyb20gJy4uL3V0aWxzL3Rocm90dGxlLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvbm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS5qcydcblxuZnVuY3Rpb24gc2hvd1JpcHBsZSAoZXZ0LCBlbCwgY3R4LCBmb3JjZUNlbnRlcikge1xuICBjdHgubW9kaWZpZXJzLnN0b3AgPT09IHRydWUgJiYgc3RvcChldnQpXG5cbiAgY29uc3QgY29sb3IgPSBjdHgubW9kaWZpZXJzLmNvbG9yXG4gIGxldCBjZW50ZXIgPSBjdHgubW9kaWZpZXJzLmNlbnRlclxuICBjZW50ZXIgPSBjZW50ZXIgPT09IHRydWUgfHwgZm9yY2VDZW50ZXIgPT09IHRydWVcblxuICBjb25zdFxuICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyksXG4gICAgaW5uZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpLFxuICAgIHBvcyA9IHBvc2l0aW9uKGV2dCksXG4gICAgeyBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgIGRpYW1ldGVyID0gTWF0aC5zcXJ0KHdpZHRoICogd2lkdGggKyBoZWlnaHQgKiBoZWlnaHQpLFxuICAgIHJhZGl1cyA9IGRpYW1ldGVyIC8gMixcbiAgICBjZW50ZXJYID0gYCR7ICh3aWR0aCAtIGRpYW1ldGVyKSAvIDIgfXB4YCxcbiAgICB4ID0gY2VudGVyID8gY2VudGVyWCA6IGAkeyBwb3MubGVmdCAtIGxlZnQgLSByYWRpdXMgfXB4YCxcbiAgICBjZW50ZXJZID0gYCR7IChoZWlnaHQgLSBkaWFtZXRlcikgLyAyIH1weGAsXG4gICAgeSA9IGNlbnRlciA/IGNlbnRlclkgOiBgJHsgcG9zLnRvcCAtIHRvcCAtIHJhZGl1cyB9cHhgXG5cbiAgaW5uZXJOb2RlLmNsYXNzTmFtZSA9ICdxLXJpcHBsZV9faW5uZXInXG4gIGNzcyhpbm5lck5vZGUsIHtcbiAgICBoZWlnaHQ6IGAkeyBkaWFtZXRlciB9cHhgLFxuICAgIHdpZHRoOiBgJHsgZGlhbWV0ZXIgfXB4YCxcbiAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgkeyB4IH0sJHsgeSB9LDApIHNjYWxlM2QoLjIsLjIsMSlgLFxuICAgIG9wYWNpdHk6IDBcbiAgfSlcblxuICBub2RlLmNsYXNzTmFtZSA9IGBxLXJpcHBsZSR7IGNvbG9yID8gJyB0ZXh0LScgKyBjb2xvciA6ICcnIH1gXG4gIG5vZGUuc2V0QXR0cmlidXRlKCdkaXInLCAnbHRyJylcbiAgbm9kZS5hcHBlbmRDaGlsZChpbm5lck5vZGUpXG4gIGVsLmFwcGVuZENoaWxkKG5vZGUpXG5cbiAgY29uc3QgYWJvcnQgPSAoKSA9PiB7XG4gICAgbm9kZS5yZW1vdmUoKVxuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgfVxuICBjdHguYWJvcnQucHVzaChhYm9ydClcblxuICBsZXQgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpbm5lck5vZGUuY2xhc3NMaXN0LmFkZCgncS1yaXBwbGVfX2lubmVyLS1lbnRlcicpXG4gICAgaW5uZXJOb2RlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgkeyBjZW50ZXJYIH0sJHsgY2VudGVyWSB9LDApIHNjYWxlM2QoMSwxLDEpYFxuICAgIGlubmVyTm9kZS5zdHlsZS5vcGFjaXR5ID0gMC4yXG5cbiAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaW5uZXJOb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3EtcmlwcGxlX19pbm5lci0tZW50ZXInKVxuICAgICAgaW5uZXJOb2RlLmNsYXNzTGlzdC5hZGQoJ3EtcmlwcGxlX19pbm5lci0tbGVhdmUnKVxuICAgICAgaW5uZXJOb2RlLnN0eWxlLm9wYWNpdHkgPSAwXG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG5vZGUucmVtb3ZlKClcbiAgICAgICAgY3R4LmFib3J0LnNwbGljZShjdHguYWJvcnQuaW5kZXhPZihhYm9ydCksIDEpXG4gICAgICB9LCAyNzUpXG4gICAgfSwgMjUwKVxuICB9LCA1MClcbn1cblxuZnVuY3Rpb24gdXBkYXRlTW9kaWZpZXJzIChjdHgsIHsgbW9kaWZpZXJzLCB2YWx1ZSwgYXJnIH0pIHtcbiAgY29uc3QgY2ZnID0gT2JqZWN0LmFzc2lnbih7fSwgY3R4LmNmZy5yaXBwbGUsIG1vZGlmaWVycywgdmFsdWUpXG4gIGN0eC5tb2RpZmllcnMgPSB7XG4gICAgZWFybHk6IGNmZy5lYXJseSA9PT0gdHJ1ZSxcbiAgICBzdG9wOiBjZmcuc3RvcCA9PT0gdHJ1ZSxcbiAgICBjZW50ZXI6IGNmZy5jZW50ZXIgPT09IHRydWUsXG4gICAgY29sb3I6IGNmZy5jb2xvciB8fCBhcmcsXG4gICAga2V5Q29kZXM6IFtdLmNvbmNhdChjZmcua2V5Q29kZXMgfHwgMTMpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRGlyZWN0aXZlKF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICA/IHsgbmFtZTogJ3JpcHBsZScsIGdldFNTUlByb3BzIH1cbiAgOiB7XG4gICAgICBuYW1lOiAncmlwcGxlJyxcblxuICAgICAgYmVmb3JlTW91bnQgKGVsLCBiaW5kaW5nKSB7XG4gICAgICAgIGNvbnN0IGNmZyA9IGJpbmRpbmcuaW5zdGFuY2UuJC5hcHBDb250ZXh0LmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRxLmNvbmZpZyB8fCB7fVxuXG4gICAgICAgIGlmIChjZmcucmlwcGxlID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3R4ID0ge1xuICAgICAgICAgIGNmZyxcbiAgICAgICAgICBlbmFibGVkOiBiaW5kaW5nLnZhbHVlICE9PSBmYWxzZSxcbiAgICAgICAgICBtb2RpZmllcnM6IHt9LFxuICAgICAgICAgIGFib3J0OiBbXSxcblxuICAgICAgICAgIHN0YXJ0IChldnQpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmVuYWJsZWQgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgZXZ0LnFTa2lwUmlwcGxlICE9PSB0cnVlXG4gICAgICAgICAgICAgICYmIGV2dC50eXBlID09PSAoY3R4Lm1vZGlmaWVycy5lYXJseSA9PT0gdHJ1ZSA/ICdwb2ludGVyZG93bicgOiAnY2xpY2snKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHNob3dSaXBwbGUoZXZ0LCBlbCwgY3R4LCBldnQucUtleUV2ZW50ID09PSB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBrZXlzdGFydDogdGhyb3R0bGUoZXZ0ID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmVuYWJsZWQgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgZXZ0LnFTa2lwUmlwcGxlICE9PSB0cnVlXG4gICAgICAgICAgICAgICYmIGlzS2V5Q29kZShldnQsIGN0eC5tb2RpZmllcnMua2V5Q29kZXMpID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGV2dC50eXBlID09PSBga2V5JHsgY3R4Lm1vZGlmaWVycy5lYXJseSA9PT0gdHJ1ZSA/ICdkb3duJyA6ICd1cCcgfWBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBzaG93UmlwcGxlKGV2dCwgZWwsIGN0eCwgdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAzMDApXG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVNb2RpZmllcnMoY3R4LCBiaW5kaW5nKVxuXG4gICAgICAgIGVsLl9fcXJpcHBsZSA9IGN0eFxuXG4gICAgICAgIGFkZEV2dChjdHgsICdtYWluJywgW1xuICAgICAgICAgIFsgZWwsICdwb2ludGVyZG93bicsICdzdGFydCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgZWwsICdjbGljaycsICdzdGFydCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgZWwsICdrZXlkb3duJywgJ2tleXN0YXJ0JywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyBlbCwgJ2tleXVwJywgJ2tleXN0YXJ0JywgJ3Bhc3NpdmUnIF1cbiAgICAgICAgXSlcbiAgICAgIH0sXG5cbiAgICAgIHVwZGF0ZWQgKGVsLCBiaW5kaW5nKSB7XG4gICAgICAgIGlmIChiaW5kaW5nLm9sZFZhbHVlICE9PSBiaW5kaW5nLnZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xcmlwcGxlXG4gICAgICAgICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBjdHguZW5hYmxlZCA9IGJpbmRpbmcudmFsdWUgIT09IGZhbHNlXG5cbiAgICAgICAgICAgIGlmIChjdHguZW5hYmxlZCA9PT0gdHJ1ZSAmJiBPYmplY3QoYmluZGluZy52YWx1ZSkgPT09IGJpbmRpbmcudmFsdWUpIHtcbiAgICAgICAgICAgICAgdXBkYXRlTW9kaWZpZXJzKGN0eCwgYmluZGluZylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGJlZm9yZVVubW91bnQgKGVsKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXJpcHBsZVxuICAgICAgICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjdHguYWJvcnQuZm9yRWFjaChmbiA9PiB7IGZuKCkgfSlcbiAgICAgICAgICBjbGVhbkV2dChjdHgsICdtYWluJylcbiAgICAgICAgICBkZWxldGUgZWwuX3FyaXBwbGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbilcbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgYWxpZ25NYXAgPSB7XG4gIGxlZnQ6ICdzdGFydCcsXG4gIGNlbnRlcjogJ2NlbnRlcicsXG4gIHJpZ2h0OiAnZW5kJyxcbiAgYmV0d2VlbjogJ2JldHdlZW4nLFxuICBhcm91bmQ6ICdhcm91bmQnLFxuICBldmVubHk6ICdldmVubHknLFxuICBzdHJldGNoOiAnc3RyZXRjaCdcbn1cblxuZXhwb3J0IGNvbnN0IGFsaWduVmFsdWVzID0gT2JqZWN0LmtleXMoYWxpZ25NYXApXG5cbmV4cG9ydCBjb25zdCB1c2VBbGlnblByb3BzID0ge1xuICBhbGlnbjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICB2YWxpZGF0b3I6IHYgPT4gYWxpZ25WYWx1ZXMuaW5jbHVkZXModilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgLy8gcmV0dXJuIGFsaWduQ2xhc3NcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBhbGlnbiA9IHByb3BzLmFsaWduID09PSB2b2lkIDBcbiAgICAgID8gcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnc3RyZXRjaCcgOiAnbGVmdCdcbiAgICAgIDogcHJvcHMuYWxpZ25cblxuICAgIHJldHVybiBgJHsgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnaXRlbXMnIDogJ2p1c3RpZnknIH0tJHsgYWxpZ25NYXBbIGFsaWduIF0gfWBcbiAgfSlcbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlQWxpZ24sIHsgdXNlQWxpZ25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWFsaWduLmpzJ1xuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcbmltcG9ydCB1c2VSb3V0ZXJMaW5rLCB7IHVzZVJvdXRlckxpbmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJvdXRlci1saW5rLmpzJ1xuXG5leHBvcnQgY29uc3QgYnRuUGFkZGluZyA9IHtcbiAgbm9uZTogMCxcbiAgeHM6IDQsXG4gIHNtOiA4LFxuICBtZDogMTYsXG4gIGxnOiAyNCxcbiAgeGw6IDMyXG59XG5cbmNvbnN0IGRlZmF1bHRTaXplcyA9IHtcbiAgeHM6IDgsXG4gIHNtOiAxMCxcbiAgbWQ6IDE0LFxuICBsZzogMjAsXG4gIHhsOiAyNFxufVxuXG5jb25zdCBmb3JtVHlwZXMgPSBbICdidXR0b24nLCAnc3VibWl0JywgJ3Jlc2V0JyBdXG5jb25zdCBtZWRpYVR5cGVSRSA9IC9bXlxcc11cXC9bXlxcc10vXG5cbmV4cG9ydCBjb25zdCBidG5EZXNpZ25PcHRpb25zID0gWyAnZmxhdCcsICdvdXRsaW5lJywgJ3B1c2gnLCAndW5lbGV2YXRlZCcgXVxuZXhwb3J0IGNvbnN0IGdldEJ0bkRlc2lnbiA9IChwcm9wcywgZGVmYXVsdFZhbHVlKSA9PiB7XG4gIGlmIChwcm9wcy5mbGF0ID09PSB0cnVlKSByZXR1cm4gJ2ZsYXQnXG4gIGlmIChwcm9wcy5vdXRsaW5lID09PSB0cnVlKSByZXR1cm4gJ291dGxpbmUnXG4gIGlmIChwcm9wcy5wdXNoID09PSB0cnVlKSByZXR1cm4gJ3B1c2gnXG4gIGlmIChwcm9wcy51bmVsZXZhdGVkID09PSB0cnVlKSByZXR1cm4gJ3VuZWxldmF0ZWQnXG4gIHJldHVybiBkZWZhdWx0VmFsdWVcbn1cbmV4cG9ydCBjb25zdCBnZXRCdG5EZXNpZ25BdHRyID0gcHJvcHMgPT4ge1xuICBjb25zdCBkZXNpZ24gPSBnZXRCdG5EZXNpZ24ocHJvcHMpXG4gIHJldHVybiBkZXNpZ24gIT09IHZvaWQgMFxuICAgID8geyBbIGRlc2lnbiBdOiB0cnVlIH1cbiAgICA6IHt9XG59XG5cbmV4cG9ydCBjb25zdCB1c2VCdG5Qcm9wcyA9IHtcbiAgLi4udXNlU2l6ZVByb3BzLFxuICAuLi51c2VSb3V0ZXJMaW5rUHJvcHMsXG5cbiAgdHlwZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnYnV0dG9uJ1xuICB9LFxuXG4gIGxhYmVsOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gIGljb246IFN0cmluZyxcbiAgaWNvblJpZ2h0OiBTdHJpbmcsXG5cbiAgLi4uYnRuRGVzaWduT3B0aW9ucy5yZWR1Y2UoXG4gICAgKGFjYywgdmFsKSA9PiAoYWNjWyB2YWwgXSA9IEJvb2xlYW4pICYmIGFjYyxcbiAgICB7fVxuICApLFxuXG4gIHNxdWFyZTogQm9vbGVhbixcbiAgcm91bmQ6IEJvb2xlYW4sXG4gIHJvdW5kZWQ6IEJvb2xlYW4sXG4gIGdsb3NzeTogQm9vbGVhbixcblxuICBzaXplOiBTdHJpbmcsXG4gIGZhYjogQm9vbGVhbixcbiAgZmFiTWluaTogQm9vbGVhbixcbiAgcGFkZGluZzogU3RyaW5nLFxuXG4gIGNvbG9yOiBTdHJpbmcsXG4gIHRleHRDb2xvcjogU3RyaW5nLFxuICBub0NhcHM6IEJvb2xlYW4sXG4gIG5vV3JhcDogQm9vbGVhbixcbiAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgdGFiaW5kZXg6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICByaXBwbGU6IHtcbiAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcblxuICBhbGlnbjoge1xuICAgIC4uLnVzZUFsaWduUHJvcHMuYWxpZ24sXG4gICAgZGVmYXVsdDogJ2NlbnRlcidcbiAgfSxcbiAgc3RhY2s6IEJvb2xlYW4sXG4gIHN0cmV0Y2g6IEJvb2xlYW4sXG4gIGxvYWRpbmc6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgZGlzYWJsZTogQm9vbGVhblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgY29uc3Qgc2l6ZVN0eWxlID0gdXNlU2l6ZShwcm9wcywgZGVmYXVsdFNpemVzKVxuICBjb25zdCBhbGlnbkNsYXNzID0gdXNlQWxpZ24ocHJvcHMpXG4gIGNvbnN0IHsgaGFzUm91dGVyTGluaywgaGFzTGluaywgbGlua1RhZywgbGlua0F0dHJzLCBuYXZpZ2F0ZU9uQ2xpY2sgfSA9IHVzZVJvdXRlckxpbmsoe1xuICAgIGZhbGxiYWNrVGFnOiAnYnV0dG9uJ1xuICB9KVxuXG4gIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IG9iaiA9IHByb3BzLmZhYiA9PT0gZmFsc2UgJiYgcHJvcHMuZmFiTWluaSA9PT0gZmFsc2VcbiAgICAgID8gc2l6ZVN0eWxlLnZhbHVlXG4gICAgICA6IHt9XG5cbiAgICByZXR1cm4gcHJvcHMucGFkZGluZyAhPT0gdm9pZCAwXG4gICAgICA/IE9iamVjdC5hc3NpZ24oe30sIG9iaiwge1xuICAgICAgICBwYWRkaW5nOiBwcm9wcy5wYWRkaW5nXG4gICAgICAgICAgLnNwbGl0KC9cXHMrLylcbiAgICAgICAgICAubWFwKHYgPT4gKHYgaW4gYnRuUGFkZGluZyA/IGJ0blBhZGRpbmdbIHYgXSArICdweCcgOiB2KSlcbiAgICAgICAgICAuam9pbignICcpLFxuICAgICAgICBtaW5XaWR0aDogJzAnLFxuICAgICAgICBtaW5IZWlnaHQ6ICcwJ1xuICAgICAgfSlcbiAgICAgIDogb2JqXG4gIH0pXG5cbiAgY29uc3QgaXNSb3VuZGVkID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5yb3VuZGVkID09PSB0cnVlIHx8IHByb3BzLmZhYiA9PT0gdHJ1ZSB8fCBwcm9wcy5mYWJNaW5pID09PSB0cnVlXG4gIClcblxuICBjb25zdCBpc0FjdGlvbmFibGUgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgcHJvcHMubG9hZGluZyAhPT0gdHJ1ZVxuICApXG5cbiAgY29uc3QgdGFiSW5kZXggPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgaXNBY3Rpb25hYmxlLnZhbHVlID09PSB0cnVlID8gcHJvcHMudGFiaW5kZXggfHwgMCA6IC0xXG4gICkpXG5cbiAgY29uc3QgZGVzaWduID0gY29tcHV0ZWQoKCkgPT4gZ2V0QnRuRGVzaWduKHByb3BzLCAnc3RhbmRhcmQnKSlcblxuICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGFjYyA9IHsgdGFiaW5kZXg6IHRhYkluZGV4LnZhbHVlIH1cblxuICAgIGlmIChoYXNMaW5rLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGFjYywgbGlua0F0dHJzLnZhbHVlKVxuICAgIH1cbiAgICBlbHNlIGlmIChmb3JtVHlwZXMuaW5jbHVkZXMocHJvcHMudHlwZSkgPT09IHRydWUpIHtcbiAgICAgIGFjYy50eXBlID0gcHJvcHMudHlwZVxuICAgIH1cblxuICAgIGlmIChsaW5rVGFnLnZhbHVlID09PSAnYScpIHtcbiAgICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICAgIGFjY1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGFjYy5ocmVmID09PSB2b2lkIDApIHtcbiAgICAgICAgYWNjLnJvbGUgPSAnYnV0dG9uJ1xuICAgICAgfVxuXG4gICAgICBpZiAoaGFzUm91dGVyTGluay52YWx1ZSAhPT0gdHJ1ZSAmJiBtZWRpYVR5cGVSRS50ZXN0KHByb3BzLnR5cGUpID09PSB0cnVlKSB7XG4gICAgICAgIGFjYy50eXBlID0gcHJvcHMudHlwZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICBhY2MuZGlzYWJsZWQgPSAnJ1xuICAgICAgYWNjWyAnYXJpYS1kaXNhYmxlZCcgXSA9ICd0cnVlJ1xuICAgIH1cblxuICAgIGlmIChwcm9wcy5sb2FkaW5nID09PSB0cnVlICYmIHByb3BzLnBlcmNlbnRhZ2UgIT09IHZvaWQgMCkge1xuICAgICAgT2JqZWN0LmFzc2lnbihhY2MsIHtcbiAgICAgICAgcm9sZTogJ3Byb2dyZXNzYmFyJyxcbiAgICAgICAgJ2FyaWEtdmFsdWVtaW4nOiAwLFxuICAgICAgICAnYXJpYS12YWx1ZW1heCc6IDEwMCxcbiAgICAgICAgJ2FyaWEtdmFsdWVub3cnOiBwcm9wcy5wZXJjZW50YWdlXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiBhY2NcbiAgfSlcblxuICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGxldCBjb2xvcnNcblxuICAgIGlmIChwcm9wcy5jb2xvciAhPT0gdm9pZCAwKSB7XG4gICAgICBpZiAocHJvcHMuZmxhdCA9PT0gdHJ1ZSB8fCBwcm9wcy5vdXRsaW5lID09PSB0cnVlKSB7XG4gICAgICAgIGNvbG9ycyA9IGB0ZXh0LSR7IHByb3BzLnRleHRDb2xvciB8fCBwcm9wcy5jb2xvciB9YFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbG9ycyA9IGBiZy0keyBwcm9wcy5jb2xvciB9IHRleHQtJHsgcHJvcHMudGV4dENvbG9yIHx8ICd3aGl0ZScgfWBcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMudGV4dENvbG9yKSB7XG4gICAgICBjb2xvcnMgPSBgdGV4dC0keyBwcm9wcy50ZXh0Q29sb3IgfWBcbiAgICB9XG5cbiAgICBjb25zdCBzaGFwZSA9IHByb3BzLnJvdW5kID09PSB0cnVlXG4gICAgICA/ICdyb3VuZCdcbiAgICAgIDogYHJlY3RhbmdsZSR7IGlzUm91bmRlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1idG4tLXJvdW5kZWQnIDogKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1idG4tLXNxdWFyZScgOiAnJykgfWBcblxuICAgIHJldHVybiBgcS1idG4tLSR7IGRlc2lnbi52YWx1ZSB9IHEtYnRuLS0keyBzaGFwZSB9YFxuICAgICAgKyAoY29sb3JzICE9PSB2b2lkIDAgPyAnICcgKyBjb2xvcnMgOiAnJylcbiAgICAgICsgKGlzQWN0aW9uYWJsZS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1idG4tLWFjdGlvbmFibGUgcS1mb2N1c2FibGUgcS1ob3ZlcmFibGUnIDogKHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAnIGRpc2FibGVkJyA6ICcnKSlcbiAgICAgICsgKHByb3BzLmZhYiA9PT0gdHJ1ZSA/ICcgcS1idG4tLWZhYicgOiAocHJvcHMuZmFiTWluaSA9PT0gdHJ1ZSA/ICcgcS1idG4tLWZhYi1taW5pJyA6ICcnKSlcbiAgICAgICsgKHByb3BzLm5vQ2FwcyA9PT0gdHJ1ZSA/ICcgcS1idG4tLW5vLXVwcGVyY2FzZScgOiAnJylcbiAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLWJ0bi0tZGVuc2UnIDogJycpXG4gICAgICArIChwcm9wcy5zdHJldGNoID09PSB0cnVlID8gJyBuby1ib3JkZXItcmFkaXVzIHNlbGYtc3RyZXRjaCcgOiAnJylcbiAgICAgICsgKHByb3BzLmdsb3NzeSA9PT0gdHJ1ZSA/ICcgZ2xvc3N5JyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID8gJyBxLWJ0bi0tc3F1YXJlJyA6ICcnKVxuICB9KVxuXG4gIGNvbnN0IGlubmVyQ2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgYWxpZ25DbGFzcy52YWx1ZSArIChwcm9wcy5zdGFjayA9PT0gdHJ1ZSA/ICcgY29sdW1uJyA6ICcgcm93JylcbiAgICArIChwcm9wcy5ub1dyYXAgPT09IHRydWUgPyAnIG5vLXdyYXAgdGV4dC1uby13cmFwJyA6ICcnKVxuICAgICsgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgPyAnIHEtYnRuX19jb250ZW50LS1oaWRkZW4nIDogJycpXG4gIClcblxuICByZXR1cm4ge1xuICAgIGNsYXNzZXMsXG4gICAgc3R5bGUsXG4gICAgaW5uZXJDbGFzc2VzLFxuICAgIGF0dHJpYnV0ZXMsXG4gICAgaGFzTGluayxcbiAgICBsaW5rVGFnLFxuICAgIG5hdmlnYXRlT25DbGljayxcbiAgICBpc0FjdGlvbmFibGVcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgVHJhbnNpdGlvbiwgb25CZWZvcmVVbm1vdW50LCB3aXRoRGlyZWN0aXZlcywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyL1FTcGlubmVyLmpzJ1xuXG5pbXBvcnQgUmlwcGxlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvUmlwcGxlLmpzJ1xuXG5pbXBvcnQgdXNlQnRuLCB7IHVzZUJ0blByb3BzIH0gZnJvbSAnLi91c2UtYnRuLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IHN0b3AsIHByZXZlbnQsIHN0b3BBbmRQcmV2ZW50LCBsaXN0ZW5PcHRzIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBpc0tleUNvZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2tleS1jb21wb3NpdGlvbi5qcydcblxuY29uc3QgeyBwYXNzaXZlQ2FwdHVyZSB9ID0gbGlzdGVuT3B0c1xuXG5sZXRcbiAgdG91Y2hUYXJnZXQgPSBudWxsLFxuICBrZXlib2FyZFRhcmdldCA9IG51bGwsXG4gIG1vdXNlVGFyZ2V0ID0gbnVsbFxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJ0bicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VCdG5Qcm9wcyxcblxuICAgIHBlcmNlbnRhZ2U6IE51bWJlcixcbiAgICBkYXJrUGVyY2VudGFnZTogQm9vbGVhbixcblxuICAgIG9uVG91Y2hzdGFydDogWyBGdW5jdGlvbiwgQXJyYXkgXVxuICB9LFxuXG4gIGVtaXRzOiBbICdjbGljaycsICdrZXlkb3duJywgJ21vdXNlZG93bicsICdrZXl1cCcgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCB7XG4gICAgICBjbGFzc2VzLCBzdHlsZSwgaW5uZXJDbGFzc2VzLFxuICAgICAgYXR0cmlidXRlcyxcbiAgICAgIGhhc0xpbmssIGxpbmtUYWcsIG5hdmlnYXRlT25DbGljayxcbiAgICAgIGlzQWN0aW9uYWJsZVxuICAgIH0gPSB1c2VCdG4ocHJvcHMpXG5cbiAgICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgYmx1clRhcmdldFJlZiA9IHJlZihudWxsKVxuXG4gICAgbGV0IGxvY2FsVG91Y2hUYXJnZXRFbCA9IG51bGwsIGF2b2lkTW91c2VSaXBwbGUsIG1vdXNlVGltZXIgPSBudWxsXG5cbiAgICBjb25zdCBoYXNMYWJlbCA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5sYWJlbCAhPT0gdm9pZCAwICYmIHByb3BzLmxhYmVsICE9PSBudWxsICYmIHByb3BzLmxhYmVsICE9PSAnJ1xuICAgIClcblxuICAgIGNvbnN0IHJpcHBsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmRpc2FibGUgPT09IHRydWUgfHwgcHJvcHMucmlwcGxlID09PSBmYWxzZVxuICAgICAgICA/IGZhbHNlXG4gICAgICAgIDoge1xuICAgICAgICAgICAga2V5Q29kZXM6IGhhc0xpbmsudmFsdWUgPT09IHRydWUgPyBbIDEzLCAzMiBdIDogWyAxMyBdLFxuICAgICAgICAgICAgLi4uKHByb3BzLnJpcHBsZSA9PT0gdHJ1ZSA/IHt9IDogcHJvcHMucmlwcGxlKVxuICAgICAgICAgIH1cbiAgICApKVxuXG4gICAgY29uc3QgcmlwcGxlUHJvcHMgPSBjb21wdXRlZCgoKSA9PiAoeyBjZW50ZXI6IHByb3BzLnJvdW5kIH0pKVxuXG4gICAgY29uc3QgcGVyY2VudGFnZVN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgdmFsID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCBwcm9wcy5wZXJjZW50YWdlKSlcbiAgICAgIHJldHVybiB2YWwgPiAwXG4gICAgICAgID8geyB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuNnMnLCB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7IHZhbCAtIDEwMCB9JSlgIH1cbiAgICAgICAgOiB7fVxuICAgIH0pXG5cbiAgICBjb25zdCBvbkV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5sb2FkaW5nID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgb25Nb3VzZWRvd246IG9uTG9hZGluZ0V2dCxcbiAgICAgICAgICBvblRvdWNoc3RhcnQ6IG9uTG9hZGluZ0V2dCxcbiAgICAgICAgICBvbkNsaWNrOiBvbkxvYWRpbmdFdnQsXG4gICAgICAgICAgb25LZXlkb3duOiBvbkxvYWRpbmdFdnQsXG4gICAgICAgICAgb25LZXl1cDogb25Mb2FkaW5nRXZ0XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGlzQWN0aW9uYWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBhY2MgPSB7XG4gICAgICAgICAgb25DbGljayxcbiAgICAgICAgICBvbktleWRvd24sXG4gICAgICAgICAgb25Nb3VzZWRvd25cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm94eS4kcS5wbGF0Zm9ybS5oYXMudG91Y2ggPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBzdWZmaXggPSBwcm9wcy5vblRvdWNoc3RhcnQgIT09IHZvaWQgMFxuICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgOiAnUGFzc2l2ZSdcblxuICAgICAgICAgIGFjY1sgYG9uVG91Y2hzdGFydCR7IHN1ZmZpeCB9YCBdID0gb25Ub3VjaHN0YXJ0XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWNjXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC8vIG5lZWRlZDsgZXNwZWNpYWxseSBmb3IgZGlzYWJsZWQgPGE+IHRhZ3NcbiAgICAgICAgb25DbGljazogc3RvcEFuZFByZXZlbnRcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3Qgbm9kZVByb3BzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIHJlZjogcm9vdFJlZixcbiAgICAgIGNsYXNzOiAncS1idG4gcS1idG4taXRlbSBub24tc2VsZWN0YWJsZSBuby1vdXRsaW5lICcgKyBjbGFzc2VzLnZhbHVlLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgLi4uYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgIC4uLm9uRXZlbnRzLnZhbHVlXG4gICAgfSkpXG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gICAgICAvLyBpcyBpdCBhbHJlYWR5IGRlc3Ryb3llZD9cbiAgICAgIGlmIChyb290UmVmLnZhbHVlID09PSBudWxsKSB7IHJldHVybiB9XG5cbiAgICAgIGlmIChlICE9PSB2b2lkIDApIHtcbiAgICAgICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAgIC8vIGZvY3VzIGJ1dHRvbiBpZiBpdCBjYW1lIGZyb20gRU5URVIgb24gZm9ybVxuICAgICAgICAvLyBwcmV2ZW50IHRoZSBuZXcgc3VibWl0IChhbHJlYWR5IGRvbmUpXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9wcy50eXBlID09PSAnc3VibWl0J1xuICAgICAgICAgICYmIGVsICE9PSBkb2N1bWVudC5ib2R5XG4gICAgICAgICAgJiYgcm9vdFJlZi52YWx1ZS5jb250YWlucyhlbCkgPT09IGZhbHNlXG4gICAgICAgICAgLy8gcmVxdWlyZWQgZm9yIGlPUyBhbmQgZGVza3RvcCBTYWZhcmlcbiAgICAgICAgICAmJiBlbC5jb250YWlucyhyb290UmVmLnZhbHVlKSA9PT0gZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgcm9vdFJlZi52YWx1ZS5mb2N1cygpXG5cbiAgICAgICAgICBjb25zdCBvbkNsaWNrQ2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBzdG9wQW5kUHJldmVudCwgdHJ1ZSlcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25DbGlja0NsZWFudXAsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICAgICAgcm9vdFJlZi52YWx1ZSAhPT0gbnVsbCAmJiByb290UmVmLnZhbHVlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCBvbkNsaWNrQ2xlYW51cCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHN0b3BBbmRQcmV2ZW50LCB0cnVlKVxuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25DbGlja0NsZWFudXAsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICAgIHJvb3RSZWYudmFsdWUuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIG9uQ2xpY2tDbGVhbnVwLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBuYXZpZ2F0ZU9uQ2xpY2soZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleWRvd24gKGUpIHtcbiAgICAgIC8vIGlzIGl0IGFscmVhZHkgZGVzdHJveWVkP1xuICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHsgcmV0dXJuIH1cblxuICAgICAgZW1pdCgna2V5ZG93bicsIGUpXG5cbiAgICAgIGlmIChpc0tleUNvZGUoZSwgWyAxMywgMzIgXSkgPT09IHRydWUgJiYga2V5Ym9hcmRUYXJnZXQgIT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAga2V5Ym9hcmRUYXJnZXQgIT09IG51bGwgJiYgY2xlYW51cCgpXG5cbiAgICAgICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGZvY3VzIGV4dGVybmFsIGJ1dHRvbiBpZiB0aGUgZm9jdXMgaGVscGVyIHdhcyBmb2N1c2VkIGJlZm9yZVxuICAgICAgICAgIHJvb3RSZWYudmFsdWUuZm9jdXMoKVxuXG4gICAgICAgICAga2V5Ym9hcmRUYXJnZXQgPSByb290UmVmLnZhbHVlXG4gICAgICAgICAgcm9vdFJlZi52YWx1ZS5jbGFzc0xpc3QuYWRkKCdxLWJ0bi0tYWN0aXZlJylcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uUHJlc3NFbmQsIHRydWUpXG4gICAgICAgICAgcm9vdFJlZi52YWx1ZS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgb25QcmVzc0VuZCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIH1cblxuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVG91Y2hzdGFydCAoZSkge1xuICAgICAgLy8gaXMgaXQgYWxyZWFkeSBkZXN0cm95ZWQ/XG4gICAgICBpZiAocm9vdFJlZi52YWx1ZSA9PT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gICAgICBlbWl0KCd0b3VjaHN0YXJ0JywgZSlcblxuICAgICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gfVxuXG4gICAgICBpZiAodG91Y2hUYXJnZXQgIT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgdG91Y2hUYXJnZXQgIT09IG51bGwgJiYgY2xlYW51cCgpXG4gICAgICAgIHRvdWNoVGFyZ2V0ID0gcm9vdFJlZi52YWx1ZVxuXG4gICAgICAgIGxvY2FsVG91Y2hUYXJnZXRFbCA9IGUudGFyZ2V0XG4gICAgICAgIGxvY2FsVG91Y2hUYXJnZXRFbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgIH1cblxuICAgICAgLy8gYXZvaWQgZHVwbGljYXRlZCBtb3VzZWRvd24gZXZlbnRcbiAgICAgIC8vIHRyaWdnZXJpbmcgYW5vdGhlciBlYXJseSByaXBwbGVcbiAgICAgIGF2b2lkTW91c2VSaXBwbGUgPSB0cnVlXG4gICAgICBtb3VzZVRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChtb3VzZVRpbWVyKVxuICAgICAgbW91c2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtb3VzZVRpbWVyID0gbnVsbFxuICAgICAgICBhdm9pZE1vdXNlUmlwcGxlID0gZmFsc2VcbiAgICAgIH0sIDIwMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlZG93biAoZSkge1xuICAgICAgLy8gaXMgaXQgYWxyZWFkeSBkZXN0cm95ZWQ/XG4gICAgICBpZiAocm9vdFJlZi52YWx1ZSA9PT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gICAgICBlLnFTa2lwUmlwcGxlID0gYXZvaWRNb3VzZVJpcHBsZSA9PT0gdHJ1ZVxuICAgICAgZW1pdCgnbW91c2Vkb3duJywgZSlcblxuICAgICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCAhPT0gdHJ1ZSAmJiBtb3VzZVRhcmdldCAhPT0gcm9vdFJlZi52YWx1ZSkge1xuICAgICAgICBtb3VzZVRhcmdldCAhPT0gbnVsbCAmJiBjbGVhbnVwKClcbiAgICAgICAgbW91c2VUYXJnZXQgPSByb290UmVmLnZhbHVlXG4gICAgICAgIHJvb3RSZWYudmFsdWUuY2xhc3NMaXN0LmFkZCgncS1idG4tLWFjdGl2ZScpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblByZXNzRW5kIChlKSB7XG4gICAgICAvLyBpcyBpdCBhbHJlYWR5IGRlc3Ryb3llZD9cbiAgICAgIGlmIChyb290UmVmLnZhbHVlID09PSBudWxsKSB7IHJldHVybiB9XG5cbiAgICAgIC8vIG5lZWRlZCBmb3IgSUUgKGJlY2F1c2UgaXQgZW1pdHMgYmx1ciB3aGVuIGZvY3VzaW5nIGJ1dHRvbiBmcm9tIGZvY3VzIGhlbHBlcilcbiAgICAgIGlmIChlICE9PSB2b2lkIDAgJiYgZS50eXBlID09PSAnYmx1cicgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gcm9vdFJlZi52YWx1ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGUgIT09IHZvaWQgMCAmJiBlLnR5cGUgPT09ICdrZXl1cCcpIHtcbiAgICAgICAgaWYgKGtleWJvYXJkVGFyZ2V0ID09PSByb290UmVmLnZhbHVlICYmIGlzS2V5Q29kZShlLCBbIDEzLCAzMiBdKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGZvciBjbGljayB0cmlnZ2VyXG4gICAgICAgICAgY29uc3QgZXZ0ID0gbmV3IE1vdXNlRXZlbnQoJ2NsaWNrJywgZSlcbiAgICAgICAgICBldnQucUtleUV2ZW50ID0gdHJ1ZVxuICAgICAgICAgIGUuZGVmYXVsdFByZXZlbnRlZCA9PT0gdHJ1ZSAmJiBwcmV2ZW50KGV2dClcbiAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9PT0gdHJ1ZSAmJiBzdG9wKGV2dClcbiAgICAgICAgICByb290UmVmLnZhbHVlLmRpc3BhdGNoRXZlbnQoZXZ0KVxuXG4gICAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcblxuICAgICAgICAgIC8vIGZvciByaXBwbGVcbiAgICAgICAgICBlLnFLZXlFdmVudCA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXQoJ2tleXVwJywgZSlcbiAgICAgIH1cblxuICAgICAgY2xlYW51cCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoZGVzdHJveWluZykge1xuICAgICAgY29uc3QgYmx1clRhcmdldCA9IGJsdXJUYXJnZXRSZWYudmFsdWVcblxuICAgICAgaWYgKFxuICAgICAgICBkZXN0cm95aW5nICE9PSB0cnVlXG4gICAgICAgICYmICh0b3VjaFRhcmdldCA9PT0gcm9vdFJlZi52YWx1ZSB8fCBtb3VzZVRhcmdldCA9PT0gcm9vdFJlZi52YWx1ZSlcbiAgICAgICAgJiYgYmx1clRhcmdldCAhPT0gbnVsbFxuICAgICAgICAmJiBibHVyVGFyZ2V0ICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICApIHtcbiAgICAgICAgYmx1clRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpXG4gICAgICAgIGJsdXJUYXJnZXQuZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBpZiAodG91Y2hUYXJnZXQgPT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgaWYgKGxvY2FsVG91Y2hUYXJnZXRFbCAhPT0gbnVsbCkge1xuICAgICAgICAgIGxvY2FsVG91Y2hUYXJnZXRFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICAgIGxvY2FsVG91Y2hUYXJnZXRFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB9XG4gICAgICAgIHRvdWNoVGFyZ2V0ID0gbG9jYWxUb3VjaFRhcmdldEVsID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAobW91c2VUYXJnZXQgPT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICBtb3VzZVRhcmdldCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKGtleWJvYXJkVGFyZ2V0ID09PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25QcmVzc0VuZCwgdHJ1ZSlcbiAgICAgICAgcm9vdFJlZi52YWx1ZSAhPT0gbnVsbCAmJiByb290UmVmLnZhbHVlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAga2V5Ym9hcmRUYXJnZXQgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIHJvb3RSZWYudmFsdWUgIT09IG51bGwgJiYgcm9vdFJlZi52YWx1ZS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJ0bi0tYWN0aXZlJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkxvYWRpbmdFdnQgKGV2dCkge1xuICAgICAgc3RvcEFuZFByZXZlbnQoZXZ0KVxuICAgICAgZXZ0LnFTa2lwUmlwcGxlID0gdHJ1ZVxuICAgIH1cblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBjbGVhbnVwKHRydWUpXG4gICAgfSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHsgY2xpY2s6IG9uQ2xpY2sgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBsZXQgaW5uZXIgPSBbXVxuXG4gICAgICBwcm9wcy5pY29uICE9PSB2b2lkIDAgJiYgaW5uZXIucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIG5hbWU6IHByb3BzLmljb24sXG4gICAgICAgICAgbGVmdDogcHJvcHMuc3RhY2sgPT09IGZhbHNlICYmIGhhc0xhYmVsLnZhbHVlID09PSB0cnVlLFxuICAgICAgICAgIHJvbGU6ICdpbWcnLFxuICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSAmJiBpbm5lci5wdXNoKFxuICAgICAgICBoKCdzcGFuJywgeyBjbGFzczogJ2Jsb2NrJyB9LCBbIHByb3BzLmxhYmVsIF0pXG4gICAgICApXG5cbiAgICAgIGlubmVyID0gaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBpbm5lcilcblxuICAgICAgaWYgKHByb3BzLmljb25SaWdodCAhPT0gdm9pZCAwICYmIHByb3BzLnJvdW5kID09PSBmYWxzZSkge1xuICAgICAgICBpbm5lci5wdXNoKFxuICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgIG5hbWU6IHByb3BzLmljb25SaWdodCxcbiAgICAgICAgICAgIHJpZ2h0OiBwcm9wcy5zdGFjayA9PT0gZmFsc2UgJiYgaGFzTGFiZWwudmFsdWUgPT09IHRydWUsXG4gICAgICAgICAgICByb2xlOiAnaW1nJyxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoJ3NwYW4nLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZvY3VzLWhlbHBlcicsXG4gICAgICAgICAgcmVmOiBibHVyVGFyZ2V0UmVmXG4gICAgICAgIH0pXG4gICAgICBdXG5cbiAgICAgIGlmIChwcm9wcy5sb2FkaW5nID09PSB0cnVlICYmIHByb3BzLnBlcmNlbnRhZ2UgIT09IHZvaWQgMCkge1xuICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgIGgoJ3NwYW4nLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtYnRuX19wcm9ncmVzcyBhYnNvbHV0ZS1mdWxsIG92ZXJmbG93LWhpZGRlbicgKyAocHJvcHMuZGFya1BlcmNlbnRhZ2UgPT09IHRydWUgPyAnIHEtYnRuX19wcm9ncmVzcy0tZGFyaycgOiAnJylcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKCdzcGFuJywge1xuICAgICAgICAgICAgICBjbGFzczogJ3EtYnRuX19wcm9ncmVzcy1pbmRpY2F0b3IgZml0IGJsb2NrJyxcbiAgICAgICAgICAgICAgc3R5bGU6IHBlcmNlbnRhZ2VTdHlsZS52YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgIGgoJ3NwYW4nLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWJ0bl9fY29udGVudCB0ZXh0LWNlbnRlciBjb2wgaXRlbXMtY2VudGVyIHEtYW5jaG9yLS1za2lwICcgKyBpbm5lckNsYXNzZXMudmFsdWVcbiAgICAgICAgfSwgaW5uZXIpXG4gICAgICApXG5cbiAgICAgIHByb3BzLmxvYWRpbmcgIT09IG51bGwgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChUcmFuc2l0aW9uLCB7XG4gICAgICAgICAgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmFkZSdcbiAgICAgICAgfSwgKCkgPT4gKFxuICAgICAgICAgIHByb3BzLmxvYWRpbmcgPT09IHRydWVcbiAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgIGgoJ3NwYW4nLCB7XG4gICAgICAgICAgICAgICAgICBrZXk6ICdsb2FkaW5nJyxcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiAnYWJzb2x1dGUtZnVsbCBmbGV4IGZsZXgtY2VudGVyJ1xuICAgICAgICAgICAgICAgIH0sIHNsb3RzLmxvYWRpbmcgIT09IHZvaWQgMCA/IHNsb3RzLmxvYWRpbmcoKSA6IFsgaChRU3Bpbm5lcikgXSlcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICkpXG4gICAgICApXG5cbiAgICAgIHJldHVybiB3aXRoRGlyZWN0aXZlcyhcbiAgICAgICAgaChcbiAgICAgICAgICBsaW5rVGFnLnZhbHVlLFxuICAgICAgICAgIG5vZGVQcm9wcy52YWx1ZSxcbiAgICAgICAgICBjaGlsZFxuICAgICAgICApLFxuICAgICAgICBbIFtcbiAgICAgICAgICBSaXBwbGUsXG4gICAgICAgICAgcmlwcGxlLnZhbHVlLFxuICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgICByaXBwbGVQcm9wcy52YWx1ZVxuICAgICAgICBdIF1cbiAgICAgIClcbiAgICB9XG4gIH1cbn0pXG4iXSwibmFtZXMiOlsiY3NzIl0sIm1hcHBpbmdzIjoiOztBQTBCTyxTQUFTLElBQUssU0FBU0EsTUFBSztBQUNqQyxRQUFNLFFBQVEsUUFBUTtBQUV0QixhQUFXLFFBQVFBLE1BQUs7QUFDdEIsVUFBTyxRQUFTQSxLQUFLO0FBQUEsRUFDdEI7QUFDSDtBQW1CTyxTQUFTLFdBQVksSUFBSTtBQUM5QixNQUFJLE9BQU8sVUFBVSxPQUFPLE1BQU07QUFDaEMsV0FBTztBQUFBLEVBQ1I7QUFFRCxNQUFJLE9BQU8sT0FBTyxVQUFVO0FBQzFCLFFBQUk7QUFDRixhQUFPLFNBQVMsY0FBYyxFQUFFLEtBQUs7QUFBQSxJQUN0QyxTQUNNLEtBQVA7QUFDRSxhQUFPO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFFRCxRQUFNLFNBQVMsTUFBTSxFQUFFO0FBQ3ZCLE1BQUksUUFBUTtBQUNWLFdBQU8sT0FBTyxPQUFPO0FBQUEsRUFDdEI7QUFDSDtBQ3JFZSxTQUFBLFNBQVUsSUFBSSxRQUFRLEtBQUs7QUFDeEMsTUFBSSxPQUFPLE9BQU87QUFFbEIsU0FBTyxXQUF5QjtBQUM5QixRQUFJLFNBQVMsT0FBTztBQUNsQixhQUFPO0FBQ1AsaUJBQVcsTUFBTTtBQUFFLGVBQU87QUFBQSxNQUFLLEdBQUksS0FBSztBQUN4QyxlQUFTLEdBQUcsTUFBTSxNQUFNLFNBQVM7QUFBQSxJQUNsQztBQUVELFdBQU87QUFBQSxFQUNSO0FBQ0g7QUNMQSxTQUFTLFdBQVksS0FBSyxJQUFJLEtBQUssYUFBYTtBQUM5QyxNQUFJLFVBQVUsU0FBUyxRQUFRLEtBQUssR0FBRztBQUV2QyxRQUFNLFFBQVEsSUFBSSxVQUFVO0FBQzVCLE1BQUksU0FBUyxJQUFJLFVBQVU7QUFDM0IsV0FBUyxXQUFXLFFBQVEsZ0JBQWdCO0FBRTVDLFFBQ0UsT0FBTyxTQUFTLGNBQWMsTUFBTSxHQUNwQyxZQUFZLFNBQVMsY0FBYyxNQUFNLEdBQ3pDLE1BQU0s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
