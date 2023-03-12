import { Q as QBtn } from "./QBtn.0d4a3a46.js";
import { w as watch, o as onMounted, a as onBeforeUnmount, f as inject, g as getCurrentInstance, Y as formKey, r as ref, c as computed, Z as debounce, $ as injectProp, a0 as onBeforeUpdate, s as stopAndPrevent, d as nextTick, u as onDeactivated, v as onActivated, i as isRuntimeSsrPreHydration, h, N as prevent, T as Transition, p as shouldIgnoreKey, a1 as client, L as stop, _ as _export_sfc, B as defineComponent, C as openBlock, D as createBlock, E as withCtx, S as createBaseVNode, F as createVNode } from "./index.40a16a13.js";
import { Q as QIcon, i as QSpinner, h as hSlot, c as createComponent } from "./use-router-link.ba6d1dac.js";
import { u as useDarkProps, a as useDark } from "./use-dark.66699697.js";
import { u as uid } from "./uid.42677368.js";
import { Q as QPage } from "./QPage.e2d61dc9.js";
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    onMounted(() => {
      props.disable !== true && $form.bindComponent(proxy);
    });
    onBeforeUnmount(() => {
      props.disable !== true && $form.unbindComponent(proxy);
    });
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(null);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(
    () => props.rules !== void 0 && props.rules !== null && props.rules.length > 0
  );
  const hasActiveRules = computed(
    () => props.disable !== true && hasRules.value === true
  );
  const hasError = computed(
    () => props.error === true || innerError.value === true
  );
  const errorMessage = computed(() => typeof props.errorMessage === "string" && props.errorMessage.length > 0 ? props.errorMessage : innerErrorMessage.value);
  watch(() => props.modelValue, () => {
    validateIfNeeded();
  });
  watch(() => props.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, () => {
          validateIfNeeded(true);
        });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(focused, (val) => {
    if (val === true) {
      if (isDirtyModel.value === null) {
        isDirtyModel.value = false;
      }
    } else if (isDirtyModel.value === false) {
      isDirtyModel.value = true;
      if (hasActiveRules.value === true && props.lazyRules !== "ondemand" && innerLoading.value === false) {
        debouncedValidate();
      }
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = null;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }
  function validate(val = props.modelValue) {
    if (hasActiveRules.value !== true) {
      return true;
    }
    const index = ++validateIndex;
    const setDirty = innerLoading.value !== true ? () => {
      isDirtyModel.value = true;
    } : () => {
    };
    const update = (err, msg) => {
      err === true && setDirty();
      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };
    const promises = [];
    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val, testPattern);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update(false);
      return true;
    }
    innerLoading.value = true;
    return Promise.all(promises).then(
      (res) => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update(false);
          return true;
        }
        const msg = res.find((r) => r === false || typeof r === "string");
        index === validateIndex && update(msg !== void 0, msg);
        return msg === void 0;
      },
      (e) => {
        if (index === validateIndex) {
          console.error(e);
          update(true);
        }
        return false;
      }
    );
  }
  function validateIfNeeded(changedRules) {
    if (hasActiveRules.value === true && props.lazyRules !== "ondemand" && (isDirtyModel.value === true || props.lazyRules !== true && changedRules !== true)) {
      debouncedValidate();
    }
  }
  const debouncedValidate = debounce(validate, 0);
  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules();
    debouncedValidate.cancel();
  });
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, "hasError", () => hasError.value);
  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    validate,
    resetValidation
  };
}
const listenerRE = /^on[A-Z]/;
function useSplitAttrs(attrs, vnode) {
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update() {
    const attributes = {};
    const listeners = {};
    for (const key in attrs) {
      if (key !== "class" && key !== "style" && listenerRE.test(key) === false) {
        attributes[key] = attrs[key];
      }
    }
    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[key] = vnode.props[key];
      }
    }
    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }
  onBeforeUpdate(update);
  update();
  return acc;
}
let queue = [];
let waitFlags = [];
function addFocusFn(fn) {
  if (waitFlags.length === 0) {
    fn();
  } else {
    queue.push(fn);
  }
}
function removeFocusFn(fn) {
  queue = queue.filter((entry) => entry !== fn);
}
function getTargetUid(val) {
  return val === void 0 ? `f_${uid()}` : val;
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length > 0;
}
const useFieldProps = {
  ...useDarkProps,
  ...useValidateProps,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String,
  maxlength: [Number, String]
};
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur", "popupShow", "popupHide"];
function useFieldState() {
  const { props, attrs, proxy, vnode } = getCurrentInstance();
  const isDark = useDark(props, proxy.$q);
  return {
    isDark,
    editable: computed(
      () => props.disable !== true && props.readonly !== true
    ),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,
    splitAttrs: useSplitAttrs(attrs, vnode),
    targetUid: ref(getTargetUid(props.for)),
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
  };
}
function useField(state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer = null;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value) => {
      emit("update:modelValue", value);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === "string" || typeof props.modelValue === "number" ? ("" + props.modelValue).length : Array.isArray(props.modelValue) === true ? props.modelValue.length : 0;
        const max = props.maxlength !== void 0 ? props.maxlength : props.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(
    () => props.bottomSlots === true || props.hint !== void 0 || hasRules.value === true || props.counter === true || props.error !== null
  );
  const styleType = computed(() => {
    if (props.filled === true) {
      return "filled";
    }
    if (props.outlined === true) {
      return "outlined";
    }
    if (props.borderless === true) {
      return "borderless";
    }
    if (props.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(
    () => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props.rounded === true ? " q-field--rounded" : "") + (props.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props.dense === true ? " q-field--dense" : "") + (props.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props.disable === true ? " q-field--disabled" : props.readonly === true ? " q-field--readonly" : "")
  );
  const contentClass = computed(
    () => "q-field__control relative-position row no-wrap" + (props.bgColor !== void 0 ? ` bg-${props.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props.standout === "string" && props.standout.length > 0 && state.focused.value === true ? ` ${props.standout}` : props.color !== void 0 ? ` text-${props.color}` : "")
  );
  const hasLabel = computed(
    () => props.labelSlot === true || props.label !== void 0
  );
  const labelClass = computed(
    () => "q-field__label no-pointer-events absolute ellipsis" + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${props.labelColor}` : "")
  );
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {
      for: state.targetUid.value
    };
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    } else if (props.readonly === true) {
      acc["aria-readonly"] = "true";
    }
    return acc;
  });
  watch(() => props.for, (val) => {
    state.targetUid.value = getTargetUid(val);
  });
  function focusHandler() {
    const el = document.activeElement;
    let target = state.targetRef !== void 0 && state.targetRef.value;
    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute("tabindex") === true || (target = target.querySelector("[tabindex]"));
      if (target && target !== el) {
        target.focus({ preventScroll: true });
      }
    }
  }
  function focus() {
    addFocusFn(focusHandler);
  }
  function blur() {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    if (focusoutTimer !== null) {
      clearTimeout(focusoutTimer);
      focusoutTimer = null;
    }
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      focusoutTimer = null;
      if (document.hasFocus() === true && (state.hasPopupOpen === true || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false)) {
        return;
      }
      if (state.focused.value === true) {
        state.focused.value = false;
        emit("blur", e);
      }
      then !== void 0 && then();
    });
  }
  function clearValue(e) {
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef !== void 0 && state.targetRef.value || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props.type === "file") {
      state.inputRef.value.value = null;
    }
    emit("update:modelValue", null);
    emit("clear", props.modelValue);
    nextTick(() => {
      resetValidation();
      if ($q.platform.is.mobile !== true) {
        isDirtyModel.value = false;
      }
    });
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(
      h("div", {
        class: "q-field__prepend q-field__marginal row no-wrap items-center",
        key: "prepend",
        onClick: prevent
      }, slots.prepend())
    );
    node.push(
      h("div", {
        class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
      }, getControlContainer())
    );
    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode("error", [
        h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
      ])
    );
    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          "inner-loading-append",
          slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props.color })]
        )
      );
    } else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode("inner-clearable-append", [
          h(QIcon, {
            class: "q-field__focusable-action",
            tag: "button",
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            type: "button",
            "aria-hidden": null,
            role: null,
            onClick: clearValue
          })
        ])
      );
    }
    slots.append !== void 0 && node.push(
      h("div", {
        class: "q-field__append q-field__marginal row no-wrap items-center",
        key: "append",
        onClick: prevent
      }, slots.append())
    );
    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode("inner-append", state.getInnerAppend())
    );
    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );
    return node;
  }
  function getControlContainer() {
    const node = [];
    props.prefix !== void 0 && props.prefix !== null && node.push(
      h("div", {
        class: "q-field__prefix no-pointer-events row items-center"
      }, props.prefix)
    );
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(
        h("div", {
          ref: state.targetRef,
          class: "q-field__native row",
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          "data-autofocus": props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }
    hasLabel.value === true && node.push(
      h("div", {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );
    props.suffix !== void 0 && props.suffix !== null && node.push(
      h("div", {
        class: "q-field__suffix no-pointer-events row items-center"
      }, props.suffix)
    );
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, errorMessage.value)];
        key = `q--slot-error-${errorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [h("div", props.hint)];
        key = `q--slot-hint-${props.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props.counter === true || slots.counter !== void 0;
    if (props.hideBottomSpace === true && hasCounter === false && msg === void 0) {
      return;
    }
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props.hideBottomSpace !== true ? "animated" : "stale"),
      onClick: prevent
    }, [
      props.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });
  onMounted(() => {
    if (isRuntimeSsrPreHydration.value === true && props.for === void 0) {
      state.targetUid.value = getTargetUid();
    }
    props.autofocus === true && proxy.focus();
  });
  onBeforeUnmount(() => {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
  });
  Object.assign(proxy, { focus, blur });
  return function renderField() {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
      ...state.splitAttrs.attributes.value,
      "data-autofocus": props.autofocus === true || void 0,
      ...attributes.value
    } : attributes.value;
    return h("label", {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
const NAMED_MASKS = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
};
const TOKENS = {
  "#": { pattern: "[\\d]", negate: "[^\\d]" },
  S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
  N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
  A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleLowerCase() },
  X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleLowerCase() }
};
const KEYS = Object.keys(TOKENS);
KEYS.forEach((key) => {
  TOKENS[key].regex = new RegExp(TOKENS[key].pattern);
});
const tokenRegexMask = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS.join("") + "])|(.)", "g"), escRegex = /[.*+?^${}()|[\]\\]/g;
const MARKER = String.fromCharCode(1);
const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean
};
function useMask(props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask;
  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());
  function getIsTypeText() {
    return props.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(props.type);
  }
  watch(() => props.type + props.autogrow, updateMaskInternals);
  watch(() => props.mask, (v) => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    } else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit("update:modelValue", val);
    }
  });
  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });
  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });
  function getInitialMaskedValue() {
    updateMaskInternals();
    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));
      return props.fillMask !== false ? fillWithMask(masked) : masked;
    }
    return props.modelValue;
  }
  function getPaddedMaskMarked(size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size);
    }
    let pad = "", localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);
    if (padPos > -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }
      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }
    return localMaskMarked;
  }
  function updateMaskInternals() {
    hasMask.value = props.mask !== void 0 && props.mask.length > 0 && getIsTypeText();
    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = "";
      maskReplaced = "";
      return;
    }
    const localComputedMask = NAMED_MASKS[props.mask] === void 0 ? props.mask : NAMED_MASKS[props.mask], fillChar = typeof props.fillMask === "string" && props.fillMask.length > 0 ? props.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, "\\$&"), unmask = [], extract = [], mask = [];
    let firstMatch = props.reverseFillMask === true, unmaskChar = "", negateChar = "";
    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[token];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
          firstMatch = false;
        }
        extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
      } else if (esc !== void 0) {
        unmaskChar = "\\" + (esc === "\\" ? "" : esc);
        mask.push(esc);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      } else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === "\\" ? "\\\\\\\\" : c.replace(escRegex, "\\\\$&");
        mask.push(c);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      }
    });
    const unmaskMatcher = new RegExp(
      "^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?" + (unmaskChar === "" ? "" : "[" + unmaskChar + "]*") + "$"
    ), extractLast = extract.length - 1, extractMatcher = extract.map((re, index) => {
      if (index === 0 && props.reverseFillMask === true) {
        return new RegExp("^" + fillCharEscaped + "*" + re);
      } else if (index === extractLast) {
        return new RegExp(
          "^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props.reverseFillMask === true ? "$" : fillCharEscaped + "*")
        );
      }
      return new RegExp("^" + re);
    });
    computedMask = mask;
    computedUnmask = (val) => {
      const unmaskMatch = unmaskMatcher.exec(props.reverseFillMask === true ? val : val.slice(0, mask.length + 1));
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join("");
      }
      const extractMatch = [], extractMatcherLength = extractMatcher.length;
      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[i].exec(str);
        if (m === null) {
          break;
        }
        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length > 0) {
        return extractMatch.join("");
      }
      return val;
    };
    maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }
  function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
    const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
    updateMaskInternalsFlag === true && updateMaskInternals();
    const preMasked = maskValue(unmasked), masked = props.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
    inp.value !== masked && (inp.value = masked);
    changed === true && (innerValue.value = masked);
    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (inputType === "insertFromPaste" && props.reverseFillMask !== true) {
        const cursor = end - 1;
        moveCursor.right(inp, cursor, cursor);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(inputType) > -1) {
        const cursor = props.reverseFillMask === true ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, "forward");
          } else {
            moveCursor.rightReverse(inp, cursor, cursor);
          }
        } else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, "backward");
        }
      } else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor, cursor);
        } else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor, cursor);
        }
      }
    });
    const val = props.unmaskedValue === true ? unmaskValue(masked) : masked;
    String(props.modelValue) !== val && emitValue(val, true);
  }
  function moveCursorForPaste(inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));
    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    inp.setSelectionRange(start, end, "forward");
  }
  const moveCursor = {
    left(inp, start, end, selection) {
      const noMarkBefore = maskMarked.slice(start - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, start - 1);
      for (; i >= 0; i--) {
        if (maskMarked[i] === MARKER) {
          start = i;
          noMarkBefore === true && start++;
          break;
        }
      }
      if (i < 0 && maskMarked[start] !== void 0 && maskMarked[start] !== MARKER) {
        return moveCursor.right(inp, 0, 0);
      }
      start >= 0 && inp.setSelectionRange(
        start,
        selection === true ? end : start,
        "backward"
      );
    },
    right(inp, start, end, selection) {
      const limit = inp.value.length;
      let i = Math.min(limit, end + 1);
      for (; i <= limit; i++) {
        if (maskMarked[i] === MARKER) {
          end = i;
          break;
        } else if (maskMarked[i - 1] === MARKER) {
          end = i;
        }
      }
      if (i > limit && maskMarked[end - 1] !== void 0 && maskMarked[end - 1] !== MARKER) {
        return moveCursor.left(inp, limit, limit);
      }
      inp.setSelectionRange(selection ? start : end, end, "forward");
    },
    leftReverse(inp, start, end, selection) {
      const localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, start - 1);
      for (; i >= 0; i--) {
        if (localMaskMarked[i - 1] === MARKER) {
          start = i;
          break;
        } else if (localMaskMarked[i] === MARKER) {
          start = i;
          if (i === 0) {
            break;
          }
        }
      }
      if (i < 0 && localMaskMarked[start] !== void 0 && localMaskMarked[start] !== MARKER) {
        return moveCursor.rightReverse(inp, 0, 0);
      }
      start >= 0 && inp.setSelectionRange(
        start,
        selection === true ? end : start,
        "backward"
      );
    },
    rightReverse(inp, start, end, selection) {
      const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = localMaskMarked.slice(0, end + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, end + 1);
      for (; i <= limit; i++) {
        if (localMaskMarked[i - 1] === MARKER) {
          end = i;
          end > 0 && noMarkBefore === true && end--;
          break;
        }
      }
      if (i > limit && localMaskMarked[end - 1] !== void 0 && localMaskMarked[end - 1] !== MARKER) {
        return moveCursor.leftReverse(inp, limit, limit);
      }
      inp.setSelectionRange(selection === true ? start : end, end, "forward");
    }
  };
  function onMaskedKeydown(e) {
    emit("keydown", e);
    if (shouldIgnoreKey(e) === true) {
      return;
    }
    const inp = inputRef.value, start = inp.selectionStart, end = inp.selectionEnd;
    if (e.keyCode === 37 || e.keyCode === 39) {
      const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props.reverseFillMask === true ? "Reverse" : "")];
      e.preventDefault();
      fn(inp, start, end, e.shiftKey);
    } else if (e.keyCode === 8 && props.reverseFillMask !== true && start === end) {
      moveCursor.left(inp, start, end, true);
    } else if (e.keyCode === 46 && props.reverseFillMask === true && start === end) {
      moveCursor.rightReverse(inp, start, end, true);
    }
  }
  function maskValue(val) {
    if (val === void 0 || val === null || val === "") {
      return "";
    }
    if (props.reverseFillMask === true) {
      return maskValueReverse(val);
    }
    const mask = computedMask;
    let valIndex = 0, output = "";
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const valChar = val[valIndex], maskDef = mask[maskIndex];
      if (typeof maskDef === "string") {
        output += maskDef;
        valChar === maskDef && valIndex++;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
        valIndex++;
      } else {
        return output;
      }
    }
    return output;
  }
  function maskValueReverse(val) {
    const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
    let valIndex = val.length - 1, output = "";
    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex > -1; maskIndex--) {
      const maskDef = mask[maskIndex];
      let valChar = val[valIndex];
      if (typeof maskDef === "string") {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[valIndex];
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
      } else {
        return output;
      }
    }
    return output;
  }
  function unmaskValue(val) {
    return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask("" + val) : val : computedUnmask(val);
  }
  function fillWithMask(val) {
    if (maskReplaced.length - val.length <= 0) {
      return val;
    }
    return props.reverseFillMask === true && val.length > 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
  }
  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown
  };
}
const useFormProps = {
  name: String
};
function useFormInputNameAttr(props) {
  return computed(() => props.name || props.for);
}
function useFileFormDomProps(props, typeGuard) {
  function getFormDomProps() {
    const model = props.modelValue;
    try {
      const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      if (Object(model) === model) {
        ("length" in model ? Array.from(model) : [model]).forEach((file) => {
          dt.items.add(file);
        });
      }
      return {
        files: dt.files
      };
    } catch (e) {
      return {
        files: void 0
      };
    }
  }
  return typeGuard === true ? computed(() => {
    if (props.type !== "file") {
      return;
    }
    return getFormDomProps();
  }) : computed(getFormDomProps);
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.qComposing !== true) {
        return;
      }
      e.target.qComposing = false;
      onInput(e);
    } else if (e.type === "compositionupdate" && e.target.qComposing !== true && typeof e.data === "string") {
      const isComposing = client.is.firefox === true ? isPlainText.test(e.data) === false : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;
      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  };
}
var QInput = createComponent({
  name: "QInput",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,
    modelValue: { required: false },
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    "paste",
    "change",
    "keydown",
    "animationend"
  ],
  setup(props, { emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer = null, emitValueFn;
    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown
    } = useMask(props, emit, emitValue, inputRef);
    const formDomProps = useFileFormDomProps(props, true);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const onComposition = useKeyComposition(onInput);
    const state = useFieldState();
    const isTextarea = computed(
      () => props.type === "textarea" || props.autogrow === true
    );
    const isTypeText = computed(
      () => isTextarea.value === true || ["text", "search", "url", "tel", "password"].includes(props.type)
    );
    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
      }
      if (props.autogrow === true) {
        evt.onAnimationend = onAnimationend;
      }
      return evt;
    });
    const inputAttrs = computed(() => {
      const attrs2 = {
        tabindex: 0,
        "data-autofocus": props.autofocus === true || void 0,
        rows: props.type === "textarea" ? 6 : void 0,
        "aria-label": props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };
      if (isTextarea.value === false) {
        attrs2.type = props.type;
      }
      if (props.autogrow === true) {
        attrs2.rows = 1;
      }
      return attrs2;
    });
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });
    watch(() => props.modelValue, (v) => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) {
            return;
          }
        }
        updateMaskValue(v);
      } else if (innerValue.value !== v) {
        innerValue.value = v;
        if (props.type === "number" && temp.hasOwnProperty("value") === true) {
          if (typedNumber === true) {
            typedNumber = false;
          } else {
            delete temp.value;
          }
        }
      }
      props.autogrow === true && nextTick(adjustHeight);
    });
    watch(() => props.autogrow, (val) => {
      if (val === true) {
        nextTick(adjustHeight);
      } else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = "auto";
      }
    });
    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });
    function focus() {
      addFocusFn(() => {
        const el = document.activeElement;
        if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }
    function select() {
      inputRef.value !== null && inputRef.value.select();
    }
    function onPaste(e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }
      emit("paste", e);
    }
    function onInput(e) {
      if (!e || !e.target) {
        return;
      }
      if (props.type === "file") {
        emit("update:modelValue", e.target.files);
        return;
      }
      const val = e.target.value;
      if (e.target.qComposing === true) {
        temp.value = val;
        return;
      }
      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      } else {
        emitValue(val);
        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }
      props.autogrow === true && adjustHeight();
    }
    function onAnimationend(e) {
      emit("animationend", e);
      adjustHeight();
    }
    function emitValue(val, stopWatcher) {
      emitValueFn = () => {
        emitTimer = null;
        if (props.type !== "number" && temp.hasOwnProperty("value") === true) {
          delete temp.value;
        }
        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;
          stopWatcher === true && (stopValueWatcher = true);
          emit("update:modelValue", val);
          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }
        emitValueFn = void 0;
      };
      if (props.type === "number") {
        typedNumber = true;
        temp.value = val;
      }
      if (props.debounce !== void 0) {
        emitTimer !== null && clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      } else {
        emitValueFn();
      }
    }
    function adjustHeight() {
      requestAnimationFrame(() => {
        const inp = inputRef.value;
        if (inp !== null) {
          const parentStyle = inp.parentNode.style;
          const { overflow } = inp.style;
          $q.platform.is.firefox !== true && (inp.style.overflow = "hidden");
          parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
          inp.style.height = "1px";
          inp.style.height = inp.scrollHeight + "px";
          inp.style.overflow = overflow;
          parentStyle.marginBottom = "";
        }
      });
    }
    function onChange(e) {
      onComposition(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn !== void 0 && emitValueFn();
      emit("change", e.target.value);
    }
    function onFinishEditing(e) {
      e !== void 0 && stop(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn !== void 0 && emitValueFn();
      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;
      props.type !== "file" && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
        }
      });
    }
    function getCurValue() {
      return temp.hasOwnProperty("value") === true ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
    }
    onBeforeUnmount(() => {
      onFinishEditing();
    });
    onMounted(() => {
      props.autogrow === true && adjustHeight();
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-${isTextarea.value === true ? "textarea" : "input"}` + (props.autogrow === true ? " q-textarea--autogrow" : "")
      ),
      hasShadow: computed(
        () => props.type !== "file" && typeof props.shadowText === "string" && props.shadowText.length > 0
      ),
      inputRef,
      emitValue,
      hasValue,
      floatingLabel: computed(
        () => hasValue.value === true || fieldValueIsFilled(props.displayValue)
      ),
      getControl: () => {
        return h(isTextarea.value === true ? "textarea" : "input", {
          ref: inputRef,
          class: [
            "q-field__native q-placeholder",
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...props.type !== "file" ? { value: getCurValue() } : formDomProps.value
        });
      },
      getShadowControl: () => {
        return h("div", {
          class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value === true ? "" : " text-no-wrap")
        }, [
          h("span", { class: "invisible" }, getCurValue()),
          h("span", props.shadowText)
        ]);
      }
    });
    const renderFn = useField(state);
    Object.assign(proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value
    });
    injectProp(proxy, "nativeEl", () => inputRef.value);
    return renderFn;
  }
});
var PageCamera_vue_vue_type_style_index_0_lang = "";
const _sfc_main = defineComponent({
  name: "PageCamera",
  data() {
    return {
      post: {
        id: uid(),
        caption: "",
        location: "",
        photo: null,
        date: Date.now()
      },
      methods: {
        initCamera() {
          navigator.mediaDevices.getUserMedia({
            video: true
          }).them((stream) => {
            this.$ref.video.srcObject = stream;
          });
        }
      },
      mounted() {
        this.initCamera();
      }
    };
  }
});
const _hoisted_1 = { class: "camera-frame q-pa-md" };
const _hoisted_2 = {
  ref: "video",
  class: "full-width",
  autoplay: ""
};
const _hoisted_3 = { class: "text-center q-pa-md" };
const _hoisted_4 = { class: "row justify-center q-ma-md" };
const _hoisted_5 = { class: "row justify-center q-ma-md" };
const _hoisted_6 = { class: "row justify-center q-mt-lg" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "constrain-more q-pa-md" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("video", _hoisted_2, null, 512)
      ]),
      createBaseVNode("div", _hoisted_3, [
        createVNode(QBtn, {
          color: "grey-10",
          icon: "eva-camera",
          size: "lg",
          round: ""
        })
      ]),
      createBaseVNode("div", _hoisted_4, [
        createVNode(QInput, {
          modelValue: _ctx.post.caption,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.post.caption = $event),
          class: "col col-sm-6",
          label: "Caption",
          dense: ""
        }, null, 8, ["modelValue"])
      ]),
      createBaseVNode("div", _hoisted_5, [
        createVNode(QInput, {
          modelValue: _ctx.post.location,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.post.location = $event),
          class: "col col-sm-6",
          label: "Location",
          dense: ""
        }, {
          append: withCtx(() => [
            createVNode(QBtn, {
              round: "",
              dense: "",
              flat: "",
              icon: "eva-navigation-2-outline"
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      createBaseVNode("div", _hoisted_6, [
        createVNode(QBtn, {
          unelevated: "",
          rounded: "",
          color: "primary",
          label: "Postar imagem"
        })
      ])
    ]),
    _: 1
  });
}
var PageCamera = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "PageCamera.vue"]]);
export { PageCamera as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZUNhbWVyYS5jNGMyNzNjZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLWZvcm0tY2hpbGQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wYXR0ZXJucy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXZhbGlkYXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc3BsaXQtYXR0cnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1maWVsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaW5wdXQvdXNlLW1hc2suanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1mb3JtLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmlsZS1kb20tcHJvcHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1rZXktY29tcG9zaXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2lucHV0L1FJbnB1dC5qcyIsIi4uLy4uLy4uL3NyYy9wYWdlcy9QYWdlQ2FtZXJhLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3QsIHdhdGNoLCBnZXRDdXJyZW50SW5zdGFuY2UsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBmb3JtS2V5IH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyB2YWxpZGF0ZSwgcmVzZXRWYWxpZGF0aW9uLCByZXF1aXJlc1FGb3JtIH0pIHtcbiAgY29uc3QgJGZvcm0gPSBpbmplY3QoZm9ybUtleSwgZmFsc2UpXG5cbiAgaWYgKCRmb3JtICE9PSBmYWxzZSkge1xuICAgIGNvbnN0IHsgcHJvcHMsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgLy8gZXhwb3J0IHB1YmxpYyBtZXRob2QgKHNvIGl0IGNhbiBiZSB1c2VkIGluIFFGb3JtKVxuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHsgdmFsaWRhdGUsIHJlc2V0VmFsaWRhdGlvbiB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuZGlzYWJsZSwgdmFsID0+IHtcbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgdHlwZW9mIHJlc2V0VmFsaWRhdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJiByZXNldFZhbGlkYXRpb24oKVxuICAgICAgICAkZm9ybS51bmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJGZvcm0uYmluZENvbXBvbmVudChwcm94eSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIC8vIHJlZ2lzdGVyIHRvIHBhcmVudCBRRm9ybVxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiAkZm9ybS5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgLy8gdW4tcmVnaXN0ZXIgZnJvbSBwYXJlbnQgUUZvcm1cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgJGZvcm0udW5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgIH0pXG4gIH1cbiAgZWxzZSBpZiAocmVxdWlyZXNRRm9ybSA9PT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1BhcmVudCBRRm9ybSBub3QgZm91bmQgb24gdXNlRm9ybUNoaWxkKCkhJylcbiAgfVxufVxuIiwiLy8gZmlsZSByZWZlcmVuY2VkIGZyb20gZG9jc1xuXG5jb25zdFxuICBoZXggPSAvXiNbMC05YS1mQS1GXXszfShbMC05YS1mQS1GXXszfSk/JC8sXG4gIGhleGEgPSAvXiNbMC05YS1mQS1GXXs0fShbMC05YS1mQS1GXXs0fSk/JC8sXG4gIGhleE9ySGV4YSA9IC9eIyhbMC05YS1mQS1GXXszfXxbMC05YS1mQS1GXXs0fXxbMC05YS1mQS1GXXs2fXxbMC05YS1mQS1GXXs4fSkkLyxcbiAgcmdiID0gL15yZ2JcXCgoKDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKSwpezJ9KDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKVxcKSQvLFxuICByZ2JhID0gL15yZ2JhXFwoKCgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKXsyfSgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKDB8MFxcLlswLTldK1sxLTldfDBcXC5bMS05XSt8MSlcXCkkL1xuXG4vLyBLZWVwIGluIHN5bmMgd2l0aCB1aS90eXBlcy9hcGkvdmFsaWRhdGlvbi5kLnRzXG5leHBvcnQgY29uc3QgdGVzdFBhdHRlcm4gPSB7XG4gIGRhdGU6IHYgPT4gL14tP1tcXGRdK1xcL1swLTFdXFxkXFwvWzAtM11cXGQkLy50ZXN0KHYpLFxuICB0aW1lOiB2ID0+IC9eKFswLTFdP1xcZHwyWzAtM10pOlswLTVdXFxkJC8udGVzdCh2KSxcbiAgZnVsbHRpbWU6IHYgPT4gL14oWzAtMV0/XFxkfDJbMC0zXSk6WzAtNV1cXGQ6WzAtNV1cXGQkLy50ZXN0KHYpLFxuICB0aW1lT3JGdWxsdGltZTogdiA9PiAvXihbMC0xXT9cXGR8MlswLTNdKTpbMC01XVxcZCg6WzAtNV1cXGQpPyQvLnRlc3QodiksXG5cbiAgLy8gLS0gUkZDIDUzMjIgLS1cbiAgLy8gLS0gQWRkZWQgaW4gdjIuNi42IC0tXG4gIC8vIFRoaXMgaXMgYSBiYXNpYyBoZWxwZXIgdmFsaWRhdGlvbi5cbiAgLy8gRm9yIHNvbWV0aGluZyBtb3JlIGNvbXBsZXggKGxpa2UgUkZDIDgyMikgeW91IHNob3VsZCB3cml0ZSBhbmQgdXNlIHlvdXIgb3duIHJ1bGUuXG4gIC8vIFdlIHdvbid0IGJlIGFjY2VwdGluZyBQUnMgdG8gZW5oYW5jZSB0aGUgb25lIGJlbG93IGJlY2F1c2Ugb2YgdGhlIHJlYXNvbiBhYm92ZS5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIGVtYWlsOiB2ID0+IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvLnRlc3QodiksXG5cbiAgaGV4Q29sb3I6IHYgPT4gaGV4LnRlc3QodiksXG4gIGhleGFDb2xvcjogdiA9PiBoZXhhLnRlc3QodiksXG4gIGhleE9ySGV4YUNvbG9yOiB2ID0+IGhleE9ySGV4YS50ZXN0KHYpLFxuXG4gIHJnYkNvbG9yOiB2ID0+IHJnYi50ZXN0KHYpLFxuICByZ2JhQ29sb3I6IHYgPT4gcmdiYS50ZXN0KHYpLFxuICByZ2JPclJnYmFDb2xvcjogdiA9PiByZ2IudGVzdCh2KSB8fCByZ2JhLnRlc3QodiksXG5cbiAgaGV4T3JSZ2JDb2xvcjogdiA9PiBoZXgudGVzdCh2KSB8fCByZ2IudGVzdCh2KSxcbiAgaGV4YU9yUmdiYUNvbG9yOiB2ID0+IGhleGEudGVzdCh2KSB8fCByZ2JhLnRlc3QodiksXG4gIGFueUNvbG9yOiB2ID0+IGhleE9ySGV4YS50ZXN0KHYpIHx8IHJnYi50ZXN0KHYpIHx8IHJnYmEudGVzdCh2KVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRlc3RQYXR0ZXJuXG59XG4iLCJpbXBvcnQgeyByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VGb3JtQ2hpbGQgZnJvbSAnLi4vdXNlLWZvcm0tY2hpbGQuanMnXG5pbXBvcnQgeyB0ZXN0UGF0dGVybiB9IGZyb20gJy4uLy4uL3V0aWxzL3BhdHRlcm5zLmpzJ1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uLy4uL3V0aWxzL2RlYm91bmNlLmpzJ1xuaW1wb3J0IHsgaW5qZWN0UHJvcCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvaW5qZWN0LW9iai1wcm9wLmpzJ1xuXG5jb25zdCBsYXp5UnVsZXNWYWx1ZXMgPSBbIHRydWUsIGZhbHNlLCAnb25kZW1hbmQnIF1cblxuZXhwb3J0IGNvbnN0IHVzZVZhbGlkYXRlUHJvcHMgPSB7XG4gIG1vZGVsVmFsdWU6IHt9LFxuXG4gIGVycm9yOiB7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIGVycm9yTWVzc2FnZTogU3RyaW5nLFxuICBub0Vycm9ySWNvbjogQm9vbGVhbixcblxuICBydWxlczogQXJyYXksXG4gIHJlYWN0aXZlUnVsZXM6IEJvb2xlYW4sXG4gIGxhenlSdWxlczoge1xuICAgIHR5cGU6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG4gICAgdmFsaWRhdG9yOiB2ID0+IGxhenlSdWxlc1ZhbHVlcy5pbmNsdWRlcyh2KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmb2N1c2VkLCBpbm5lckxvYWRpbmcpIHtcbiAgY29uc3QgeyBwcm9wcywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgaW5uZXJFcnJvciA9IHJlZihmYWxzZSlcbiAgY29uc3QgaW5uZXJFcnJvck1lc3NhZ2UgPSByZWYobnVsbClcbiAgY29uc3QgaXNEaXJ0eU1vZGVsID0gcmVmKG51bGwpXG5cbiAgdXNlRm9ybUNoaWxkKHsgdmFsaWRhdGUsIHJlc2V0VmFsaWRhdGlvbiB9KVxuXG4gIGxldCB2YWxpZGF0ZUluZGV4ID0gMCwgdW53YXRjaFJ1bGVzXG5cbiAgY29uc3QgaGFzUnVsZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLnJ1bGVzICE9PSB2b2lkIDBcbiAgICAmJiBwcm9wcy5ydWxlcyAhPT0gbnVsbFxuICAgICYmIHByb3BzLnJ1bGVzLmxlbmd0aCA+IDBcbiAgKVxuXG4gIGNvbnN0IGhhc0FjdGl2ZVJ1bGVzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgJiYgaGFzUnVsZXMudmFsdWUgPT09IHRydWVcbiAgKVxuXG4gIGNvbnN0IGhhc0Vycm9yID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5lcnJvciA9PT0gdHJ1ZSB8fCBpbm5lckVycm9yLnZhbHVlID09PSB0cnVlXG4gIClcblxuICBjb25zdCBlcnJvck1lc3NhZ2UgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgdHlwZW9mIHByb3BzLmVycm9yTWVzc2FnZSA9PT0gJ3N0cmluZycgJiYgcHJvcHMuZXJyb3JNZXNzYWdlLmxlbmd0aCA+IDBcbiAgICAgID8gcHJvcHMuZXJyb3JNZXNzYWdlXG4gICAgICA6IGlubmVyRXJyb3JNZXNzYWdlLnZhbHVlXG4gICkpXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgKCkgPT4ge1xuICAgIHZhbGlkYXRlSWZOZWVkZWQoKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLnJlYWN0aXZlUnVsZXMsIHZhbCA9PiB7XG4gICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHVud2F0Y2hSdWxlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hSdWxlcyA9IHdhdGNoKCgpID0+IHByb3BzLnJ1bGVzLCAoKSA9PiB7XG4gICAgICAgICAgdmFsaWRhdGVJZk5lZWRlZCh0cnVlKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh1bndhdGNoUnVsZXMgIT09IHZvaWQgMCkge1xuICAgICAgdW53YXRjaFJ1bGVzKClcbiAgICAgIHVud2F0Y2hSdWxlcyA9IHZvaWQgMFxuICAgIH1cbiAgfSwgeyBpbW1lZGlhdGU6IHRydWUgfSlcblxuICB3YXRjaChmb2N1c2VkLCB2YWwgPT4ge1xuICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgIGlmIChpc0RpcnR5TW9kZWwudmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNEaXJ0eU1vZGVsLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gdHJ1ZVxuXG4gICAgICBpZiAoXG4gICAgICAgIGhhc0FjdGl2ZVJ1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgICAgICYmIHByb3BzLmxhenlSdWxlcyAhPT0gJ29uZGVtYW5kJ1xuICAgICAgICAvLyBEb24ndCByZS10cmlnZ2VyIGlmIGl0J3MgYWxyZWFkeSBpbiBwcm9ncmVzcztcbiAgICAgICAgLy8gSXQgbWlnaHQgbWVhbiB0aGF0IGZvY3VzIHN3aXRjaGVkIHRvIHN1Ym1pdCBidG4gYW5kXG4gICAgICAgIC8vIFFGb3JtJ3Mgc3VibWl0KCkgaGFzIGJlZW4gY2FsbGVkIGFscmVhZHkgKEVOVEVSIGtleSlcbiAgICAgICAgJiYgaW5uZXJMb2FkaW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgKSB7XG4gICAgICAgIGRlYm91bmNlZFZhbGlkYXRlKClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgZnVuY3Rpb24gcmVzZXRWYWxpZGF0aW9uICgpIHtcbiAgICB2YWxpZGF0ZUluZGV4KytcbiAgICBpbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IG51bGxcbiAgICBpbm5lckVycm9yLnZhbHVlID0gZmFsc2VcbiAgICBpbm5lckVycm9yTWVzc2FnZS52YWx1ZSA9IG51bGxcbiAgICBkZWJvdW5jZWRWYWxpZGF0ZS5jYW5jZWwoKVxuICB9XG5cbiAgLypcbiAgICogUmV0dXJuIHZhbHVlXG4gICAqICAgLSB0cnVlICh2YWxpZGF0aW9uIHN1Y2NlZWRlZClcbiAgICogICAtIGZhbHNlICh2YWxpZGF0aW9uIGZhaWxlZClcbiAgICogICAtIFByb21pc2UgKHBlbmRpbmcgYXN5bmMgdmFsaWRhdGlvbilcbiAgICovXG4gIGZ1bmN0aW9uIHZhbGlkYXRlICh2YWwgPSBwcm9wcy5tb2RlbFZhbHVlKSB7XG4gICAgaWYgKGhhc0FjdGl2ZVJ1bGVzLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gKyt2YWxpZGF0ZUluZGV4XG5cbiAgICBjb25zdCBzZXREaXJ0eSA9IGlubmVyTG9hZGluZy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgPyAoKSA9PiB7IGlzRGlydHlNb2RlbC52YWx1ZSA9IHRydWUgfVxuICAgICAgOiAoKSA9PiB7fVxuXG4gICAgY29uc3QgdXBkYXRlID0gKGVyciwgbXNnKSA9PiB7XG4gICAgICBlcnIgPT09IHRydWUgJiYgc2V0RGlydHkoKVxuXG4gICAgICBpbm5lckVycm9yLnZhbHVlID0gZXJyXG4gICAgICBpbm5lckVycm9yTWVzc2FnZS52YWx1ZSA9IG1zZyB8fCBudWxsXG4gICAgICBpbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2VzID0gW11cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMucnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJ1bGUgPSBwcm9wcy5ydWxlc1sgaSBdXG4gICAgICBsZXQgcmVzXG5cbiAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXMgPSBydWxlKHZhbCwgdGVzdFBhdHRlcm4pXG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgcnVsZSA9PT0gJ3N0cmluZycgJiYgdGVzdFBhdHRlcm5bIHJ1bGUgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJlcyA9IHRlc3RQYXR0ZXJuWyBydWxlIF0odmFsKVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzID09PSBmYWxzZSB8fCB0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgICB1cGRhdGUodHJ1ZSwgcmVzKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHJlcyAhPT0gdHJ1ZSAmJiByZXMgIT09IHZvaWQgMCkge1xuICAgICAgICBwcm9taXNlcy5wdXNoKHJlcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvbWlzZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB1cGRhdGUoZmFsc2UpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGlubmVyTG9hZGluZy52YWx1ZSA9IHRydWVcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihcbiAgICAgIHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMgPT09IHZvaWQgMCB8fCBBcnJheS5pc0FycmF5KHJlcykgPT09IGZhbHNlIHx8IHJlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiB1cGRhdGUoZmFsc2UpXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1zZyA9IHJlcy5maW5kKHIgPT4gciA9PT0gZmFsc2UgfHwgdHlwZW9mIHIgPT09ICdzdHJpbmcnKVxuICAgICAgICBpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiB1cGRhdGUobXNnICE9PSB2b2lkIDAsIG1zZylcbiAgICAgICAgcmV0dXJuIG1zZyA9PT0gdm9pZCAwXG4gICAgICB9LFxuICAgICAgZSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdmFsaWRhdGVJbmRleCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICB1cGRhdGUodHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlSWZOZWVkZWQgKGNoYW5nZWRSdWxlcykge1xuICAgIGlmIChcbiAgICAgIGhhc0FjdGl2ZVJ1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBwcm9wcy5sYXp5UnVsZXMgIT09ICdvbmRlbWFuZCdcbiAgICAgICYmIChpc0RpcnR5TW9kZWwudmFsdWUgPT09IHRydWUgfHwgKHByb3BzLmxhenlSdWxlcyAhPT0gdHJ1ZSAmJiBjaGFuZ2VkUnVsZXMgIT09IHRydWUpKVxuICAgICkge1xuICAgICAgZGVib3VuY2VkVmFsaWRhdGUoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRlYm91bmNlZFZhbGlkYXRlID0gZGVib3VuY2UodmFsaWRhdGUsIDApXG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICB1bndhdGNoUnVsZXMgIT09IHZvaWQgMCAmJiB1bndhdGNoUnVsZXMoKVxuICAgIGRlYm91bmNlZFZhbGlkYXRlLmNhbmNlbCgpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzICYgcHJvcHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyByZXNldFZhbGlkYXRpb24sIHZhbGlkYXRlIH0pXG4gIGluamVjdFByb3AocHJveHksICdoYXNFcnJvcicsICgpID0+IGhhc0Vycm9yLnZhbHVlKVxuXG4gIHJldHVybiB7XG4gICAgaXNEaXJ0eU1vZGVsLFxuICAgIGhhc1J1bGVzLFxuICAgIGhhc0Vycm9yLFxuICAgIGVycm9yTWVzc2FnZSxcblxuICAgIHZhbGlkYXRlLFxuICAgIHJlc2V0VmFsaWRhdGlvblxuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIG9uQmVmb3JlVXBkYXRlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBsaXN0ZW5lclJFID0gL15vbltBLVpdL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoYXR0cnMsIHZub2RlKSB7XG4gIGNvbnN0IGFjYyA9IHtcbiAgICBsaXN0ZW5lcnM6IHJlZih7fSksXG4gICAgYXR0cmlidXRlczogcmVmKHt9KVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlICgpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0ge31cbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB7fVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cnMpIHtcbiAgICAgIGlmIChrZXkgIT09ICdjbGFzcycgJiYga2V5ICE9PSAnc3R5bGUnICYmIGxpc3RlbmVyUkUudGVzdChrZXkpID09PSBmYWxzZSkge1xuICAgICAgICBhdHRyaWJ1dGVzWyBrZXkgXSA9IGF0dHJzWyBrZXkgXVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIHZub2RlLnByb3BzKSB7XG4gICAgICBpZiAobGlzdGVuZXJSRS50ZXN0KGtleSkgPT09IHRydWUpIHtcbiAgICAgICAgbGlzdGVuZXJzWyBrZXkgXSA9IHZub2RlLnByb3BzWyBrZXkgXVxuICAgICAgfVxuICAgIH1cblxuICAgIGFjYy5hdHRyaWJ1dGVzLnZhbHVlID0gYXR0cmlidXRlc1xuICAgIGFjYy5saXN0ZW5lcnMudmFsdWUgPSBsaXN0ZW5lcnNcbiAgfVxuXG4gIG9uQmVmb3JlVXBkYXRlKHVwZGF0ZSlcblxuICB1cGRhdGUoKVxuXG4gIHJldHVybiBhY2Ncbn1cbiIsImxldCBxdWV1ZSA9IFtdXG5sZXQgd2FpdEZsYWdzID0gW11cblxuZnVuY3Rpb24gY2xlYXJGbGFnIChmbGFnKSB7XG4gIHdhaXRGbGFncyA9IHdhaXRGbGFncy5maWx0ZXIoZW50cnkgPT4gZW50cnkgIT09IGZsYWcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c1dhaXRGbGFnIChmbGFnKSB7XG4gIGNsZWFyRmxhZyhmbGFnKVxuICB3YWl0RmxhZ3MucHVzaChmbGFnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRm9jdXNXYWl0RmxhZyAoZmxhZykge1xuICBjbGVhckZsYWcoZmxhZylcblxuICBpZiAod2FpdEZsYWdzLmxlbmd0aCA9PT0gMCAmJiBxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgLy8gb25seSBjYWxsIGxhc3QgZm9jdXMgaGFuZGxlciAoY2FuJ3QgZm9jdXMgbXVsdGlwbGUgdGhpbmdzIGF0IG9uY2UpXG4gICAgcXVldWVbIHF1ZXVlLmxlbmd0aCAtIDEgXSgpXG4gICAgcXVldWUgPSBbXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c0ZuIChmbikge1xuICBpZiAod2FpdEZsYWdzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZuKClcbiAgfVxuICBlbHNlIHtcbiAgICBxdWV1ZS5wdXNoKGZuKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c0ZuIChmbikge1xuICBxdWV1ZSA9IHF1ZXVlLmZpbHRlcihlbnRyeSA9PiBlbnRyeSAhPT0gZm4pXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgVHJhbnNpdGlvbiwgbmV4dFRpY2ssIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3Bpbm5lci9RU3Bpbm5lci5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB1c2VWYWxpZGF0ZSwgeyB1c2VWYWxpZGF0ZVByb3BzIH0gZnJvbSAnLi91c2UtdmFsaWRhdGUuanMnXG5pbXBvcnQgdXNlU3BsaXRBdHRycyBmcm9tICcuL3VzZS1zcGxpdC1hdHRycy5qcydcblxuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB1aWQgZnJvbSAnLi4vLi4vdXRpbHMvdWlkLmpzJ1xuaW1wb3J0IHsgcHJldmVudCwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4sIHJlbW92ZUZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5cbmZ1bmN0aW9uIGdldFRhcmdldFVpZCAodmFsKSB7XG4gIHJldHVybiB2YWwgPT09IHZvaWQgMCA/IGBmXyR7IHVpZCgpIH1gIDogdmFsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZFZhbHVlSXNGaWxsZWQgKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2b2lkIDBcbiAgICAmJiB2YWwgIT09IG51bGxcbiAgICAmJiAoJycgKyB2YWwpLmxlbmd0aCA+IDBcbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpZWxkUHJvcHMgPSB7XG4gIC4uLnVzZURhcmtQcm9wcyxcbiAgLi4udXNlVmFsaWRhdGVQcm9wcyxcblxuICBsYWJlbDogU3RyaW5nLFxuICBzdGFja0xhYmVsOiBCb29sZWFuLFxuICBoaW50OiBTdHJpbmcsXG4gIGhpZGVIaW50OiBCb29sZWFuLFxuICBwcmVmaXg6IFN0cmluZyxcbiAgc3VmZml4OiBTdHJpbmcsXG5cbiAgbGFiZWxDb2xvcjogU3RyaW5nLFxuICBjb2xvcjogU3RyaW5nLFxuICBiZ0NvbG9yOiBTdHJpbmcsXG5cbiAgZmlsbGVkOiBCb29sZWFuLFxuICBvdXRsaW5lZDogQm9vbGVhbixcbiAgYm9yZGVybGVzczogQm9vbGVhbixcbiAgc3RhbmRvdXQ6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG5cbiAgc3F1YXJlOiBCb29sZWFuLFxuXG4gIGxvYWRpbmc6IEJvb2xlYW4sXG5cbiAgbGFiZWxTbG90OiBCb29sZWFuLFxuXG4gIGJvdHRvbVNsb3RzOiBCb29sZWFuLFxuICBoaWRlQm90dG9tU3BhY2U6IEJvb2xlYW4sXG5cbiAgcm91bmRlZDogQm9vbGVhbixcbiAgZGVuc2U6IEJvb2xlYW4sXG4gIGl0ZW1BbGlnbmVkOiBCb29sZWFuLFxuXG4gIGNvdW50ZXI6IEJvb2xlYW4sXG5cbiAgY2xlYXJhYmxlOiBCb29sZWFuLFxuICBjbGVhckljb246IFN0cmluZyxcblxuICBkaXNhYmxlOiBCb29sZWFuLFxuICByZWFkb25seTogQm9vbGVhbixcblxuICBhdXRvZm9jdXM6IEJvb2xlYW4sXG5cbiAgZm9yOiBTdHJpbmcsXG5cbiAgbWF4bGVuZ3RoOiBbIE51bWJlciwgU3RyaW5nIF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpZWxkRW1pdHMgPSBbICd1cGRhdGU6bW9kZWxWYWx1ZScsICdjbGVhcicsICdmb2N1cycsICdibHVyJywgJ3BvcHVwU2hvdycsICdwb3B1cEhpZGUnIF1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZpZWxkU3RhdGUgKCkge1xuICBjb25zdCB7IHByb3BzLCBhdHRycywgcHJveHksIHZub2RlIH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHByb3h5LiRxKVxuXG4gIHJldHVybiB7XG4gICAgaXNEYXJrLFxuXG4gICAgZWRpdGFibGU6IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIHByb3BzLnJlYWRvbmx5ICE9PSB0cnVlXG4gICAgKSxcblxuICAgIGlubmVyTG9hZGluZzogcmVmKGZhbHNlKSxcbiAgICBmb2N1c2VkOiByZWYoZmFsc2UpLFxuICAgIGhhc1BvcHVwT3BlbjogZmFsc2UsXG5cbiAgICBzcGxpdEF0dHJzOiB1c2VTcGxpdEF0dHJzKGF0dHJzLCB2bm9kZSksXG4gICAgdGFyZ2V0VWlkOiByZWYoZ2V0VGFyZ2V0VWlkKHByb3BzLmZvcikpLFxuXG4gICAgcm9vdFJlZjogcmVmKG51bGwpLFxuICAgIHRhcmdldFJlZjogcmVmKG51bGwpLFxuICAgIGNvbnRyb2xSZWY6IHJlZihudWxsKVxuXG4gICAgLyoqXG4gICAgICogdXNlciBzdXBwbGllZCBhZGRpdGlvbmFsczpcblxuICAgICAqIGlubmVyVmFsdWUgLSBjb21wdXRlZFxuICAgICAqIGZsb2F0aW5nTGFiZWwgLSBjb21wdXRlZFxuICAgICAqIGlucHV0UmVmIC0gY29tcHV0ZWRcblxuICAgICAqIGZpZWxkQ2xhc3MgLSBjb21wdXRlZFxuICAgICAqIGhhc1NoYWRvdyAtIGNvbXB1dGVkXG5cbiAgICAgKiBjb250cm9sRXZlbnRzIC0gT2JqZWN0IHdpdGggZm4oZSlcblxuICAgICAqIGdldENvbnRyb2wgLSBmblxuICAgICAqIGdldElubmVyQXBwZW5kIC0gZm5cbiAgICAgKiBnZXRDb250cm9sQ2hpbGQgLSBmblxuICAgICAqIGdldFNoYWRvd0NvbnRyb2wgLSBmblxuICAgICAqIHNob3dQb3B1cCAtIGZuXG4gICAgICovXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlKSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHNsb3RzLCBhdHRycywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgbGV0IGZvY3Vzb3V0VGltZXIgPSBudWxsXG5cbiAgaWYgKHN0YXRlLmhhc1ZhbHVlID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5oYXNWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGZpZWxkVmFsdWVJc0ZpbGxlZChwcm9wcy5tb2RlbFZhbHVlKSlcbiAgfVxuXG4gIGlmIChzdGF0ZS5lbWl0VmFsdWUgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmVtaXRWYWx1ZSA9IHZhbHVlID0+IHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsdWUpXG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLmNvbnRyb2xFdmVudHMgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmNvbnRyb2xFdmVudHMgPSB7XG4gICAgICBvbkZvY3VzaW46IG9uQ29udHJvbEZvY3VzaW4sXG4gICAgICBvbkZvY3Vzb3V0OiBvbkNvbnRyb2xGb2N1c291dFxuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICBjbGVhclZhbHVlLFxuICAgIG9uQ29udHJvbEZvY3VzaW4sXG4gICAgb25Db250cm9sRm9jdXNvdXQsXG4gICAgZm9jdXNcbiAgfSlcblxuICBpZiAoc3RhdGUuY29tcHV0ZWRDb3VudGVyID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5jb21wdXRlZENvdW50ZXIgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMuY291bnRlciAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgbGVuID0gdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwcm9wcy5tb2RlbFZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgICAgID8gKCcnICsgcHJvcHMubW9kZWxWYWx1ZSkubGVuZ3RoXG4gICAgICAgICAgOiAoQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdHJ1ZSA/IHByb3BzLm1vZGVsVmFsdWUubGVuZ3RoIDogMClcblxuICAgICAgICBjb25zdCBtYXggPSBwcm9wcy5tYXhsZW5ndGggIT09IHZvaWQgMFxuICAgICAgICAgID8gcHJvcHMubWF4bGVuZ3RoXG4gICAgICAgICAgOiBwcm9wcy5tYXhWYWx1ZXNcblxuICAgICAgICByZXR1cm4gbGVuICsgKG1heCAhPT0gdm9pZCAwID8gJyAvICcgKyBtYXggOiAnJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29uc3Qge1xuICAgIGlzRGlydHlNb2RlbCxcbiAgICBoYXNSdWxlcyxcbiAgICBoYXNFcnJvcixcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgcmVzZXRWYWxpZGF0aW9uXG4gIH0gPSB1c2VWYWxpZGF0ZShzdGF0ZS5mb2N1c2VkLCBzdGF0ZS5pbm5lckxvYWRpbmcpXG5cbiAgY29uc3QgZmxvYXRpbmdMYWJlbCA9IHN0YXRlLmZsb2F0aW5nTGFiZWwgIT09IHZvaWQgMFxuICAgID8gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc3RhY2tMYWJlbCA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlIHx8IHN0YXRlLmZsb2F0aW5nTGFiZWwudmFsdWUgPT09IHRydWUpXG4gICAgOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5zdGFja0xhYmVsID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuaGFzVmFsdWUudmFsdWUgPT09IHRydWUpXG5cbiAgY29uc3Qgc2hvdWxkUmVuZGVyQm90dG9tID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5ib3R0b21TbG90cyA9PT0gdHJ1ZVxuICAgIHx8IHByb3BzLmhpbnQgIT09IHZvaWQgMFxuICAgIHx8IGhhc1J1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgfHwgcHJvcHMuY291bnRlciA9PT0gdHJ1ZVxuICAgIHx8IHByb3BzLmVycm9yICE9PSBudWxsXG4gIClcblxuICBjb25zdCBzdHlsZVR5cGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLmZpbGxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gJ2ZpbGxlZCcgfVxuICAgIGlmIChwcm9wcy5vdXRsaW5lZCA9PT0gdHJ1ZSkgeyByZXR1cm4gJ291dGxpbmVkJyB9XG4gICAgaWYgKHByb3BzLmJvcmRlcmxlc3MgPT09IHRydWUpIHsgcmV0dXJuICdib3JkZXJsZXNzJyB9XG4gICAgaWYgKHByb3BzLnN0YW5kb3V0KSB7IHJldHVybiAnc3RhbmRvdXQnIH1cbiAgICByZXR1cm4gJ3N0YW5kYXJkJ1xuICB9KVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGBxLWZpZWxkIHJvdyBuby13cmFwIGl0ZW1zLXN0YXJ0IHEtZmllbGQtLSR7IHN0eWxlVHlwZS52YWx1ZSB9YFxuICAgICsgKHN0YXRlLmZpZWxkQ2xhc3MgIT09IHZvaWQgMCA/IGAgJHsgc3RhdGUuZmllbGRDbGFzcy52YWx1ZSB9YCA6ICcnKVxuICAgICsgKHByb3BzLnJvdW5kZWQgPT09IHRydWUgPyAnIHEtZmllbGQtLXJvdW5kZWQnIDogJycpXG4gICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWZpZWxkLS1zcXVhcmUnIDogJycpXG4gICAgKyAoZmxvYXRpbmdMYWJlbC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZmxvYXQnIDogJycpXG4gICAgKyAoaGFzTGFiZWwudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWxhYmVsZWQnIDogJycpXG4gICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtZmllbGQtLWRlbnNlJyA6ICcnKVxuICAgICsgKHByb3BzLml0ZW1BbGlnbmVkID09PSB0cnVlID8gJyBxLWZpZWxkLS1pdGVtLWFsaWduZWQgcS1pdGVtLXR5cGUnIDogJycpXG4gICAgKyAoc3RhdGUuaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1kYXJrJyA6ICcnKVxuICAgICsgKHN0YXRlLmdldENvbnRyb2wgPT09IHZvaWQgMCA/ICcgcS1maWVsZC0tYXV0by1oZWlnaHQnIDogJycpXG4gICAgKyAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZm9jdXNlZCcgOiAnJylcbiAgICArIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZXJyb3InIDogJycpXG4gICAgKyAoaGFzRXJyb3IudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0taGlnaGxpZ2h0ZWQnIDogJycpXG4gICAgKyAocHJvcHMuaGlkZUJvdHRvbVNwYWNlICE9PSB0cnVlICYmIHNob3VsZFJlbmRlckJvdHRvbS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0td2l0aC1ib3R0b20nIDogJycpXG4gICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZGlzYWJsZWQnIDogKHByb3BzLnJlYWRvbmx5ID09PSB0cnVlID8gJyBxLWZpZWxkLS1yZWFkb25seScgOiAnJykpXG4gIClcblxuICBjb25zdCBjb250ZW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLWZpZWxkX19jb250cm9sIHJlbGF0aXZlLXBvc2l0aW9uIHJvdyBuby13cmFwJ1xuICAgICsgKHByb3BzLmJnQ29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuYmdDb2xvciB9YCA6ICcnKVxuICAgICsgKFxuICAgICAgaGFzRXJyb3IudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAnIHRleHQtbmVnYXRpdmUnXG4gICAgICAgIDogKFxuICAgICAgICAgICAgdHlwZW9mIHByb3BzLnN0YW5kb3V0ID09PSAnc3RyaW5nJyAmJiBwcm9wcy5zdGFuZG91dC5sZW5ndGggPiAwICYmIHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyBgICR7IHByb3BzLnN0YW5kb3V0IH1gXG4gICAgICAgICAgICAgIDogKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICAgICApXG4gICAgKVxuICApXG5cbiAgY29uc3QgaGFzTGFiZWwgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmxhYmVsU2xvdCA9PT0gdHJ1ZSB8fCBwcm9wcy5sYWJlbCAhPT0gdm9pZCAwXG4gIClcblxuICBjb25zdCBsYWJlbENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAncS1maWVsZF9fbGFiZWwgbm8tcG9pbnRlci1ldmVudHMgYWJzb2x1dGUgZWxsaXBzaXMnXG4gICAgKyAocHJvcHMubGFiZWxDb2xvciAhPT0gdm9pZCAwICYmIGhhc0Vycm9yLnZhbHVlICE9PSB0cnVlID8gYCB0ZXh0LSR7IHByb3BzLmxhYmVsQ29sb3IgfWAgOiAnJylcbiAgKVxuXG4gIGNvbnN0IGNvbnRyb2xTbG90U2NvcGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgIGlkOiBzdGF0ZS50YXJnZXRVaWQudmFsdWUsXG4gICAgZWRpdGFibGU6IHN0YXRlLmVkaXRhYmxlLnZhbHVlLFxuICAgIGZvY3VzZWQ6IHN0YXRlLmZvY3VzZWQudmFsdWUsXG4gICAgZmxvYXRpbmdMYWJlbDogZmxvYXRpbmdMYWJlbC52YWx1ZSxcbiAgICBtb2RlbFZhbHVlOiBwcm9wcy5tb2RlbFZhbHVlLFxuICAgIGVtaXRWYWx1ZTogc3RhdGUuZW1pdFZhbHVlXG4gIH0pKVxuXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgYWNjID0ge1xuICAgICAgZm9yOiBzdGF0ZS50YXJnZXRVaWQudmFsdWVcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgYWNjWyAnYXJpYS1kaXNhYmxlZCcgXSA9ICd0cnVlJ1xuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZSkge1xuICAgICAgYWNjWyAnYXJpYS1yZWFkb25seScgXSA9ICd0cnVlJ1xuICAgIH1cblxuICAgIHJldHVybiBhY2NcbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5mb3IsIHZhbCA9PiB7XG4gICAgLy8gZG9uJ3QgdHJhbnNmb3JtIHRhcmdldFVpZCBpbnRvIGEgY29tcHV0ZWRcbiAgICAvLyBwcm9wIGFzIGl0IHdpbGwgYnJlYWsgU1NSXG4gICAgc3RhdGUudGFyZ2V0VWlkLnZhbHVlID0gZ2V0VGFyZ2V0VWlkKHZhbClcbiAgfSlcblxuICBmdW5jdGlvbiBmb2N1c0hhbmRsZXIgKCkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgIGxldCB0YXJnZXQgPSBzdGF0ZS50YXJnZXRSZWYgIT09IHZvaWQgMCAmJiBzdGF0ZS50YXJnZXRSZWYudmFsdWVcblxuICAgIGlmICh0YXJnZXQgJiYgKGVsID09PSBudWxsIHx8IGVsLmlkICE9PSBzdGF0ZS50YXJnZXRVaWQudmFsdWUpKSB7XG4gICAgICB0YXJnZXQuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpID09PSB0cnVlIHx8ICh0YXJnZXQgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignW3RhYmluZGV4XScpKVxuICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQgIT09IGVsKSB7XG4gICAgICAgIHRhcmdldC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgYWRkRm9jdXNGbihmb2N1c0hhbmRsZXIpXG4gIH1cblxuICBmdW5jdGlvbiBibHVyICgpIHtcbiAgICByZW1vdmVGb2N1c0ZuKGZvY3VzSGFuZGxlcilcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICBpZiAoZWwgIT09IG51bGwgJiYgc3RhdGUucm9vdFJlZi52YWx1ZS5jb250YWlucyhlbCkpIHtcbiAgICAgIGVsLmJsdXIoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29udHJvbEZvY3VzaW4gKGUpIHtcbiAgICBpZiAoZm9jdXNvdXRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gICAgICBmb2N1c291dFRpbWVyID0gbnVsbFxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSA9IHRydWVcbiAgICAgIGVtaXQoJ2ZvY3VzJywgZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkNvbnRyb2xGb2N1c291dCAoZSwgdGhlbikge1xuICAgIGZvY3Vzb3V0VGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gICAgZm9jdXNvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZm9jdXNvdXRUaW1lciA9IG51bGxcblxuICAgICAgaWYgKFxuICAgICAgICBkb2N1bWVudC5oYXNGb2N1cygpID09PSB0cnVlICYmIChcbiAgICAgICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPT09IHRydWVcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmID09PSB2b2lkIDBcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmLnZhbHVlID09PSBudWxsXG4gICAgICAgICAgfHwgc3RhdGUuY29udHJvbFJlZi52YWx1ZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAhPT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlID0gZmFsc2VcbiAgICAgICAgZW1pdCgnYmx1cicsIGUpXG4gICAgICB9XG5cbiAgICAgIHRoZW4gIT09IHZvaWQgMCAmJiB0aGVuKClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJWYWx1ZSAoZSkge1xuICAgIC8vIHByZXZlbnQgYWN0aXZhdGluZyB0aGUgZmllbGQgYnV0IGtlZXAgZm9jdXMgb24gZGVza3RvcFxuICAgIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICBpZiAoJHEucGxhdGZvcm0uaXMubW9iaWxlICE9PSB0cnVlKSB7XG4gICAgICBjb25zdCBlbCA9IChzdGF0ZS50YXJnZXRSZWYgIT09IHZvaWQgMCAmJiBzdGF0ZS50YXJnZXRSZWYudmFsdWUpIHx8IHN0YXRlLnJvb3RSZWYudmFsdWVcbiAgICAgIGVsLmZvY3VzKClcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhdGUucm9vdFJlZi52YWx1ZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZSkge1xuICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcbiAgICB9XG5cbiAgICBpZiAocHJvcHMudHlwZSA9PT0gJ2ZpbGUnKSB7IC8vIFRPRE8gdnVlM1xuICAgICAgLy8gZG8gbm90IGxldCBmb2N1cyBiZSB0cmlnZ2VyZWRcbiAgICAgIC8vIGFzIGl0IHdpbGwgbWFrZSB0aGUgbmF0aXZlIGZpbGUgZGlhbG9nXG4gICAgICAvLyBhcHBlYXIgZm9yIGFub3RoZXIgc2VsZWN0aW9uXG4gICAgICBzdGF0ZS5pbnB1dFJlZi52YWx1ZS52YWx1ZSA9IG51bGxcbiAgICB9XG5cbiAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG51bGwpXG4gICAgZW1pdCgnY2xlYXInLCBwcm9wcy5tb2RlbFZhbHVlKVxuXG4gICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgcmVzZXRWYWxpZGF0aW9uKClcblxuICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLm1vYmlsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICBjb25zdCBub2RlID0gW11cblxuICAgIHNsb3RzLnByZXBlbmQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fcHJlcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBrZXk6ICdwcmVwZW5kJyxcbiAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgfSwgc2xvdHMucHJlcGVuZCgpKVxuICAgIClcblxuICAgIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19jb250cm9sLWNvbnRhaW5lciBjb2wgcmVsYXRpdmUtcG9zaXRpb24gcm93IG5vLXdyYXAgcS1hbmNob3ItLXNraXAnXG4gICAgICB9LCBnZXRDb250cm9sQ29udGFpbmVyKCkpXG4gICAgKVxuXG4gICAgaGFzRXJyb3IudmFsdWUgPT09IHRydWUgJiYgcHJvcHMubm9FcnJvckljb24gPT09IGZhbHNlICYmIG5vZGUucHVzaChcbiAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnZXJyb3InLCBbXG4gICAgICAgIGgoUUljb24sIHsgbmFtZTogJHEuaWNvblNldC5maWVsZC5lcnJvciwgY29sb3I6ICduZWdhdGl2ZScgfSlcbiAgICAgIF0pXG4gICAgKVxuXG4gICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgfHwgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIGdldElubmVyQXBwZW5kTm9kZShcbiAgICAgICAgICAnaW5uZXItbG9hZGluZy1hcHBlbmQnLFxuICAgICAgICAgIHNsb3RzLmxvYWRpbmcgIT09IHZvaWQgMFxuICAgICAgICAgICAgPyBzbG90cy5sb2FkaW5nKClcbiAgICAgICAgICAgIDogWyBoKFFTcGlubmVyLCB7IGNvbG9yOiBwcm9wcy5jb2xvciB9KSBdXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMuY2xlYXJhYmxlID09PSB0cnVlICYmIHN0YXRlLmhhc1ZhbHVlLnZhbHVlID09PSB0cnVlICYmIHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnaW5uZXItY2xlYXJhYmxlLWFwcGVuZCcsIFtcbiAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2ZvY3VzYWJsZS1hY3Rpb24nLFxuICAgICAgICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIG5hbWU6IHByb3BzLmNsZWFySWNvbiB8fCAkcS5pY29uU2V0LmZpZWxkLmNsZWFyLFxuICAgICAgICAgICAgdGFiaW5kZXg6IDAsXG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6IG51bGwsXG4gICAgICAgICAgICByb2xlOiBudWxsLFxuICAgICAgICAgICAgb25DbGljazogY2xlYXJWYWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIF0pXG4gICAgICApXG4gICAgfVxuXG4gICAgc2xvdHMuYXBwZW5kICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FwcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBrZXk6ICdhcHBlbmQnLFxuICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICB9LCBzbG90cy5hcHBlbmQoKSlcbiAgICApXG5cbiAgICBzdGF0ZS5nZXRJbm5lckFwcGVuZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnaW5uZXItYXBwZW5kJywgc3RhdGUuZ2V0SW5uZXJBcHBlbmQoKSlcbiAgICApXG5cbiAgICBzdGF0ZS5nZXRDb250cm9sQ2hpbGQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBzdGF0ZS5nZXRDb250cm9sQ2hpbGQoKVxuICAgIClcblxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250cm9sQ29udGFpbmVyICgpIHtcbiAgICBjb25zdCBub2RlID0gW11cblxuICAgIHByb3BzLnByZWZpeCAhPT0gdm9pZCAwICYmIHByb3BzLnByZWZpeCAhPT0gbnVsbCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fcHJlZml4IG5vLXBvaW50ZXItZXZlbnRzIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBwcm9wcy5wcmVmaXgpXG4gICAgKVxuXG4gICAgaWYgKHN0YXRlLmdldFNoYWRvd0NvbnRyb2wgIT09IHZvaWQgMCAmJiBzdGF0ZS5oYXNTaGFkb3cudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgc3RhdGUuZ2V0U2hhZG93Q29udHJvbCgpXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmdldENvbnRyb2wgIT09IHZvaWQgMCkge1xuICAgICAgbm9kZS5wdXNoKHN0YXRlLmdldENvbnRyb2woKSlcbiAgICB9XG4gICAgLy8gaW50ZXJuYWwgdXNhZ2Ugb25seTpcbiAgICBlbHNlIGlmIChzbG90cy5yYXdDb250cm9sICE9PSB2b2lkIDApIHtcbiAgICAgIG5vZGUucHVzaChzbG90cy5yYXdDb250cm9sKCkpXG4gICAgfVxuICAgIGVsc2UgaWYgKHNsb3RzLmNvbnRyb2wgIT09IHZvaWQgMCkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBzdGF0ZS50YXJnZXRSZWYsXG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19uYXRpdmUgcm93JyxcbiAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSB8fCB2b2lkIDBcbiAgICAgICAgfSwgc2xvdHMuY29udHJvbChjb250cm9sU2xvdFNjb3BlLnZhbHVlKSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBsYWJlbENsYXNzLnZhbHVlXG4gICAgICB9LCBoU2xvdChzbG90cy5sYWJlbCwgcHJvcHMubGFiZWwpKVxuICAgIClcblxuICAgIHByb3BzLnN1ZmZpeCAhPT0gdm9pZCAwICYmIHByb3BzLnN1ZmZpeCAhPT0gbnVsbCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fc3VmZml4IG5vLXBvaW50ZXItZXZlbnRzIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBwcm9wcy5zdWZmaXgpXG4gICAgKVxuXG4gICAgcmV0dXJuIG5vZGUuY29uY2F0KGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm90dG9tICgpIHtcbiAgICBsZXQgbXNnLCBrZXlcblxuICAgIGlmIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGVycm9yTWVzc2FnZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBtc2cgPSBbIGgoJ2RpdicsIHsgcm9sZTogJ2FsZXJ0JyB9LCBlcnJvck1lc3NhZ2UudmFsdWUpIF1cbiAgICAgICAga2V5ID0gYHEtLXNsb3QtZXJyb3ItJHsgZXJyb3JNZXNzYWdlLnZhbHVlIH1gXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbXNnID0gaFNsb3Qoc2xvdHMuZXJyb3IpXG4gICAgICAgIGtleSA9ICdxLS1zbG90LWVycm9yJ1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5oaWRlSGludCAhPT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAocHJvcHMuaGludCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG1zZyA9IFsgaCgnZGl2JywgcHJvcHMuaGludCkgXVxuICAgICAgICBrZXkgPSBgcS0tc2xvdC1oaW50LSR7IHByb3BzLmhpbnQgfWBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBtc2cgPSBoU2xvdChzbG90cy5oaW50KVxuICAgICAgICBrZXkgPSAncS0tc2xvdC1oaW50J1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhhc0NvdW50ZXIgPSBwcm9wcy5jb3VudGVyID09PSB0cnVlIHx8IHNsb3RzLmNvdW50ZXIgIT09IHZvaWQgMFxuXG4gICAgaWYgKHByb3BzLmhpZGVCb3R0b21TcGFjZSA9PT0gdHJ1ZSAmJiBoYXNDb3VudGVyID09PSBmYWxzZSAmJiBtc2cgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgbWFpbiA9IGgoJ2RpdicsIHtcbiAgICAgIGtleSxcbiAgICAgIGNsYXNzOiAncS1maWVsZF9fbWVzc2FnZXMgY29sJ1xuICAgIH0sIG1zZylcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogJ3EtZmllbGRfX2JvdHRvbSByb3cgaXRlbXMtc3RhcnQgcS1maWVsZF9fYm90dG9tLS0nXG4gICAgICAgICsgKHByb3BzLmhpZGVCb3R0b21TcGFjZSAhPT0gdHJ1ZSA/ICdhbmltYXRlZCcgOiAnc3RhbGUnKSxcbiAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICB9LCBbXG4gICAgICBwcm9wcy5oaWRlQm90dG9tU3BhY2UgPT09IHRydWVcbiAgICAgICAgPyBtYWluXG4gICAgICAgIDogaChUcmFuc2l0aW9uLCB7IG5hbWU6ICdxLXRyYW5zaXRpb24tLWZpZWxkLW1lc3NhZ2UnIH0sICgpID0+IG1haW4pLFxuXG4gICAgICBoYXNDb3VudGVyID09PSB0cnVlXG4gICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fY291bnRlcidcbiAgICAgICAgfSwgc2xvdHMuY291bnRlciAhPT0gdm9pZCAwID8gc2xvdHMuY291bnRlcigpIDogc3RhdGUuY29tcHV0ZWRDb3VudGVyLnZhbHVlKVxuICAgICAgICA6IG51bGxcbiAgICBdKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW5uZXJBcHBlbmROb2RlIChrZXksIGNvbnRlbnQpIHtcbiAgICByZXR1cm4gY29udGVudCA9PT0gbnVsbFxuICAgICAgPyBudWxsXG4gICAgICA6IGgoJ2RpdicsIHtcbiAgICAgICAga2V5LFxuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FwcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAnXG4gICAgICB9LCBjb250ZW50KVxuICB9XG5cbiAgbGV0IHNob3VsZEFjdGl2YXRlID0gZmFsc2VcblxuICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICBzaG91bGRBY3RpdmF0ZSA9IHRydWVcbiAgfSlcblxuICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgc2hvdWxkQWN0aXZhdGUgPT09IHRydWUgJiYgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIHByb3h5LmZvY3VzKClcbiAgfSlcblxuICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIGlmIChpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUgPT09IHRydWUgJiYgcHJvcHMuZm9yID09PSB2b2lkIDApIHtcbiAgICAgIHN0YXRlLnRhcmdldFVpZC52YWx1ZSA9IGdldFRhcmdldFVpZCgpXG4gICAgfVxuXG4gICAgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIHByb3h5LmZvY3VzKClcbiAgfSlcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIGZvY3Vzb3V0VGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgZm9jdXMsIGJsdXIgfSlcblxuICByZXR1cm4gZnVuY3Rpb24gcmVuZGVyRmllbGQgKCkge1xuICAgIGNvbnN0IGxhYmVsQXR0cnMgPSBzdGF0ZS5nZXRDb250cm9sID09PSB2b2lkIDAgJiYgc2xvdHMuY29udHJvbCA9PT0gdm9pZCAwXG4gICAgICA/IHtcbiAgICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMCxcbiAgICAgICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlXG4gICAgICAgIH1cbiAgICAgIDogYXR0cmlidXRlcy52YWx1ZVxuXG4gICAgcmV0dXJuIGgoJ2xhYmVsJywge1xuICAgICAgcmVmOiBzdGF0ZS5yb290UmVmLFxuICAgICAgY2xhc3M6IFtcbiAgICAgICAgY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgYXR0cnMuY2xhc3NcbiAgICAgIF0sXG4gICAgICBzdHlsZTogYXR0cnMuc3R5bGUsXG4gICAgICAuLi5sYWJlbEF0dHJzXG4gICAgfSwgW1xuICAgICAgc2xvdHMuYmVmb3JlICE9PSB2b2lkIDBcbiAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19iZWZvcmUgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICAgIH0sIHNsb3RzLmJlZm9yZSgpKVxuICAgICAgICA6IG51bGwsXG5cbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19pbm5lciByZWxhdGl2ZS1wb3NpdGlvbiBjb2wgc2VsZi1zdHJldGNoJ1xuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBzdGF0ZS5jb250cm9sUmVmLFxuICAgICAgICAgIGNsYXNzOiBjb250ZW50Q2xhc3MudmFsdWUsXG4gICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgIC4uLnN0YXRlLmNvbnRyb2xFdmVudHNcbiAgICAgICAgfSwgZ2V0Q29udGVudCgpKSxcblxuICAgICAgICBzaG91bGRSZW5kZXJCb3R0b20udmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/IGdldEJvdHRvbSgpXG4gICAgICAgICAgOiBudWxsXG4gICAgICBdKSxcblxuICAgICAgc2xvdHMuYWZ0ZXIgIT09IHZvaWQgMFxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FmdGVyIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgICB9LCBzbG90cy5hZnRlcigpKVxuICAgICAgICA6IG51bGxcbiAgICBdKVxuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBuZXh0VGljayB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgc2hvdWxkSWdub3JlS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5cbi8vIGxlYXZlIE5BTUVEX01BU0tTIGF0IHRvcCBvZiBmaWxlIChjb2RlIHJlZmVyZW5jZWQgZnJvbSBkb2NzKVxuY29uc3QgTkFNRURfTUFTS1MgPSB7XG4gIGRhdGU6ICcjIyMjLyMjLyMjJyxcbiAgZGF0ZXRpbWU6ICcjIyMjLyMjLyMjICMjOiMjJyxcbiAgdGltZTogJyMjOiMjJyxcbiAgZnVsbHRpbWU6ICcjIzojIzojIycsXG4gIHBob25lOiAnKCMjIykgIyMjIC0gIyMjIycsXG4gIGNhcmQ6ICcjIyMjICMjIyMgIyMjIyAjIyMjJ1xufVxuXG5jb25zdCBUT0tFTlMgPSB7XG4gICcjJzogeyBwYXR0ZXJuOiAnW1xcXFxkXScsIG5lZ2F0ZTogJ1teXFxcXGRdJyB9LFxuXG4gIFM6IHsgcGF0dGVybjogJ1thLXpBLVpdJywgbmVnYXRlOiAnW15hLXpBLVpdJyB9LFxuICBOOiB7IHBhdHRlcm46ICdbMC05YS16QS1aXScsIG5lZ2F0ZTogJ1teMC05YS16QS1aXScgfSxcblxuICBBOiB7IHBhdHRlcm46ICdbYS16QS1aXScsIG5lZ2F0ZTogJ1teYS16QS1aXScsIHRyYW5zZm9ybTogdiA9PiB2LnRvTG9jYWxlVXBwZXJDYXNlKCkgfSxcbiAgYTogeyBwYXR0ZXJuOiAnW2EtekEtWl0nLCBuZWdhdGU6ICdbXmEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZUxvd2VyQ2FzZSgpIH0sXG5cbiAgWDogeyBwYXR0ZXJuOiAnWzAtOWEtekEtWl0nLCBuZWdhdGU6ICdbXjAtOWEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZVVwcGVyQ2FzZSgpIH0sXG4gIHg6IHsgcGF0dGVybjogJ1swLTlhLXpBLVpdJywgbmVnYXRlOiAnW14wLTlhLXpBLVpdJywgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb2NhbGVMb3dlckNhc2UoKSB9XG59XG5cbmNvbnN0IEtFWVMgPSBPYmplY3Qua2V5cyhUT0tFTlMpXG5LRVlTLmZvckVhY2goa2V5ID0+IHtcbiAgVE9LRU5TWyBrZXkgXS5yZWdleCA9IG5ldyBSZWdFeHAoVE9LRU5TWyBrZXkgXS5wYXR0ZXJuKVxufSlcblxuY29uc3RcbiAgdG9rZW5SZWdleE1hc2sgPSBuZXcgUmVnRXhwKCdcXFxcXFxcXChbXi4qKz9eJHt9KCl8KFtcXFxcXV0pfChbLiorP14ke30oKXxbXFxcXF1dKXwoWycgKyBLRVlTLmpvaW4oJycpICsgJ10pfCguKScsICdnJyksXG4gIGVzY1JlZ2V4ID0gL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nXG5cbmNvbnN0IE1BUktFUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMSlcblxuZXhwb3J0IGNvbnN0IHVzZU1hc2tQcm9wcyA9IHtcbiAgbWFzazogU3RyaW5nLFxuICByZXZlcnNlRmlsbE1hc2s6IEJvb2xlYW4sXG4gIGZpbGxNYXNrOiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICB1bm1hc2tlZFZhbHVlOiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgZW1pdCwgZW1pdFZhbHVlLCBpbnB1dFJlZikge1xuICBsZXQgbWFza01hcmtlZCwgbWFza1JlcGxhY2VkLCBjb21wdXRlZE1hc2ssIGNvbXB1dGVkVW5tYXNrXG5cbiAgY29uc3QgaGFzTWFzayA9IHJlZihudWxsKVxuICBjb25zdCBpbm5lclZhbHVlID0gcmVmKGdldEluaXRpYWxNYXNrZWRWYWx1ZSgpKVxuXG4gIGZ1bmN0aW9uIGdldElzVHlwZVRleHQgKCkge1xuICAgIHJldHVybiBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZVxuICAgICAgfHwgWyAndGV4dGFyZWEnLCAndGV4dCcsICdzZWFyY2gnLCAndXJsJywgJ3RlbCcsICdwYXNzd29yZCcgXS5pbmNsdWRlcyhwcm9wcy50eXBlKVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudHlwZSArIHByb3BzLmF1dG9ncm93LCB1cGRhdGVNYXNrSW50ZXJuYWxzKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1hc2ssIHYgPT4ge1xuICAgIGlmICh2ICE9PSB2b2lkIDApIHtcbiAgICAgIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlLCB0cnVlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbCA9IHVubWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUpXG4gICAgICB1cGRhdGVNYXNrSW50ZXJuYWxzKClcbiAgICAgIHByb3BzLm1vZGVsVmFsdWUgIT09IHZhbCAmJiBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuZmlsbE1hc2sgKyBwcm9wcy5yZXZlcnNlRmlsbE1hc2ssICgpID0+IHtcbiAgICBoYXNNYXNrLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlLCB0cnVlKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLnVubWFza2VkVmFsdWUsICgpID0+IHtcbiAgICBoYXNNYXNrLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlKVxuICB9KVxuXG4gIGZ1bmN0aW9uIGdldEluaXRpYWxNYXNrZWRWYWx1ZSAoKSB7XG4gICAgdXBkYXRlTWFza0ludGVybmFscygpXG5cbiAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgbWFza2VkID0gbWFza1ZhbHVlKHVubWFza1ZhbHVlKHByb3BzLm1vZGVsVmFsdWUpKVxuXG4gICAgICByZXR1cm4gcHJvcHMuZmlsbE1hc2sgIT09IGZhbHNlXG4gICAgICAgID8gZmlsbFdpdGhNYXNrKG1hc2tlZClcbiAgICAgICAgOiBtYXNrZWRcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMubW9kZWxWYWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFkZGVkTWFza01hcmtlZCAoc2l6ZSkge1xuICAgIGlmIChzaXplIDwgbWFza01hcmtlZC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBtYXNrTWFya2VkLnNsaWNlKC1zaXplKVxuICAgIH1cblxuICAgIGxldCBwYWQgPSAnJywgbG9jYWxNYXNrTWFya2VkID0gbWFza01hcmtlZFxuICAgIGNvbnN0IHBhZFBvcyA9IGxvY2FsTWFza01hcmtlZC5pbmRleE9mKE1BUktFUilcblxuICAgIGlmIChwYWRQb3MgPiAtMSkge1xuICAgICAgZm9yIChsZXQgaSA9IHNpemUgLSBsb2NhbE1hc2tNYXJrZWQubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHBhZCArPSBNQVJLRVJcbiAgICAgIH1cblxuICAgICAgbG9jYWxNYXNrTWFya2VkID0gbG9jYWxNYXNrTWFya2VkLnNsaWNlKDAsIHBhZFBvcykgKyBwYWQgKyBsb2NhbE1hc2tNYXJrZWQuc2xpY2UocGFkUG9zKVxuICAgIH1cblxuICAgIHJldHVybiBsb2NhbE1hc2tNYXJrZWRcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU1hc2tJbnRlcm5hbHMgKCkge1xuICAgIGhhc01hc2sudmFsdWUgPSBwcm9wcy5tYXNrICE9PSB2b2lkIDBcbiAgICAgICYmIHByb3BzLm1hc2subGVuZ3RoID4gMFxuICAgICAgJiYgZ2V0SXNUeXBlVGV4dCgpXG5cbiAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbXB1dGVkVW5tYXNrID0gdm9pZCAwXG4gICAgICBtYXNrTWFya2VkID0gJydcbiAgICAgIG1hc2tSZXBsYWNlZCA9ICcnXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdFxuICAgICAgbG9jYWxDb21wdXRlZE1hc2sgPSBOQU1FRF9NQVNLU1sgcHJvcHMubWFzayBdID09PSB2b2lkIDBcbiAgICAgICAgPyBwcm9wcy5tYXNrXG4gICAgICAgIDogTkFNRURfTUFTS1NbIHByb3BzLm1hc2sgXSxcbiAgICAgIGZpbGxDaGFyID0gdHlwZW9mIHByb3BzLmZpbGxNYXNrID09PSAnc3RyaW5nJyAmJiBwcm9wcy5maWxsTWFzay5sZW5ndGggPiAwXG4gICAgICAgID8gcHJvcHMuZmlsbE1hc2suc2xpY2UoMCwgMSlcbiAgICAgICAgOiAnXycsXG4gICAgICBmaWxsQ2hhckVzY2FwZWQgPSBmaWxsQ2hhci5yZXBsYWNlKGVzY1JlZ2V4LCAnXFxcXCQmJyksXG4gICAgICB1bm1hc2sgPSBbXSxcbiAgICAgIGV4dHJhY3QgPSBbXSxcbiAgICAgIG1hc2sgPSBbXVxuXG4gICAgbGV0XG4gICAgICBmaXJzdE1hdGNoID0gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlLFxuICAgICAgdW5tYXNrQ2hhciA9ICcnLFxuICAgICAgbmVnYXRlQ2hhciA9ICcnXG5cbiAgICBsb2NhbENvbXB1dGVkTWFzay5yZXBsYWNlKHRva2VuUmVnZXhNYXNrLCAoXywgY2hhcjEsIGVzYywgdG9rZW4sIGNoYXIyKSA9PiB7XG4gICAgICBpZiAodG9rZW4gIT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCBjID0gVE9LRU5TWyB0b2tlbiBdXG4gICAgICAgIG1hc2sucHVzaChjKVxuICAgICAgICBuZWdhdGVDaGFyID0gYy5uZWdhdGVcbiAgICAgICAgaWYgKGZpcnN0TWF0Y2ggPT09IHRydWUpIHtcbiAgICAgICAgICBleHRyYWN0LnB1c2goJyg/OicgKyBuZWdhdGVDaGFyICsgJyspPygnICsgYy5wYXR0ZXJuICsgJyspPyg/OicgKyBuZWdhdGVDaGFyICsgJyspPygnICsgYy5wYXR0ZXJuICsgJyspPycpXG4gICAgICAgICAgZmlyc3RNYXRjaCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZXh0cmFjdC5wdXNoKCcoPzonICsgbmVnYXRlQ2hhciArICcrKT8oJyArIGMucGF0dGVybiArICcpPycpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChlc2MgIT09IHZvaWQgMCkge1xuICAgICAgICB1bm1hc2tDaGFyID0gJ1xcXFwnICsgKGVzYyA9PT0gJ1xcXFwnID8gJycgOiBlc2MpXG4gICAgICAgIG1hc2sucHVzaChlc2MpXG4gICAgICAgIHVubWFzay5wdXNoKCcoW14nICsgdW5tYXNrQ2hhciArICddKyk/JyArIHVubWFza0NoYXIgKyAnPycpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgYyA9IGNoYXIxICE9PSB2b2lkIDAgPyBjaGFyMSA6IGNoYXIyXG4gICAgICAgIHVubWFza0NoYXIgPSBjID09PSAnXFxcXCcgPyAnXFxcXFxcXFxcXFxcXFxcXCcgOiBjLnJlcGxhY2UoZXNjUmVnZXgsICdcXFxcXFxcXCQmJylcbiAgICAgICAgbWFzay5wdXNoKGMpXG4gICAgICAgIHVubWFzay5wdXNoKCcoW14nICsgdW5tYXNrQ2hhciArICddKyk/JyArIHVubWFza0NoYXIgKyAnPycpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0XG4gICAgICB1bm1hc2tNYXRjaGVyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgJ14nXG4gICAgICAgICsgdW5tYXNrLmpvaW4oJycpXG4gICAgICAgICsgJygnICsgKHVubWFza0NoYXIgPT09ICcnID8gJy4nIDogJ1teJyArIHVubWFza0NoYXIgKyAnXScpICsgJyspPydcbiAgICAgICAgKyAodW5tYXNrQ2hhciA9PT0gJycgPyAnJyA6ICdbJyArIHVubWFza0NoYXIgKyAnXSonKSArICckJ1xuICAgICAgKSxcbiAgICAgIGV4dHJhY3RMYXN0ID0gZXh0cmFjdC5sZW5ndGggLSAxLFxuICAgICAgZXh0cmFjdE1hdGNoZXIgPSBleHRyYWN0Lm1hcCgocmUsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyBmaWxsQ2hhckVzY2FwZWQgKyAnKicgKyByZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gZXh0cmFjdExhc3QpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICdeJyArIHJlXG4gICAgICAgICAgICArICcoJyArIChuZWdhdGVDaGFyID09PSAnJyA/ICcuJyA6IG5lZ2F0ZUNoYXIpICsgJyspPydcbiAgICAgICAgICAgICsgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/ICckJyA6IGZpbGxDaGFyRXNjYXBlZCArICcqJylcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyByZSlcbiAgICAgIH0pXG5cbiAgICBjb21wdXRlZE1hc2sgPSBtYXNrXG4gICAgY29tcHV0ZWRVbm1hc2sgPSB2YWwgPT4ge1xuICAgICAgY29uc3QgdW5tYXNrTWF0Y2ggPSB1bm1hc2tNYXRjaGVyLmV4ZWMocHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlID8gdmFsIDogdmFsLnNsaWNlKDAsIG1hc2subGVuZ3RoICsgMSkpXG4gICAgICBpZiAodW5tYXNrTWF0Y2ggIT09IG51bGwpIHtcbiAgICAgICAgdmFsID0gdW5tYXNrTWF0Y2guc2xpY2UoMSkuam9pbignJylcbiAgICAgIH1cblxuICAgICAgY29uc3RcbiAgICAgICAgZXh0cmFjdE1hdGNoID0gW10sXG4gICAgICAgIGV4dHJhY3RNYXRjaGVyTGVuZ3RoID0gZXh0cmFjdE1hdGNoZXIubGVuZ3RoXG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBzdHIgPSB2YWw7IGkgPCBleHRyYWN0TWF0Y2hlckxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG0gPSBleHRyYWN0TWF0Y2hlclsgaSBdLmV4ZWMoc3RyKVxuXG4gICAgICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0ciA9IHN0ci5zbGljZShtLnNoaWZ0KCkubGVuZ3RoKVxuICAgICAgICBleHRyYWN0TWF0Y2gucHVzaCguLi5tKVxuICAgICAgfVxuICAgICAgaWYgKGV4dHJhY3RNYXRjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBleHRyYWN0TWF0Y2guam9pbignJylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbFxuICAgIH1cbiAgICBtYXNrTWFya2VkID0gbWFzay5tYXAodiA9PiAodHlwZW9mIHYgPT09ICdzdHJpbmcnID8gdiA6IE1BUktFUikpLmpvaW4oJycpXG4gICAgbWFza1JlcGxhY2VkID0gbWFza01hcmtlZC5zcGxpdChNQVJLRVIpLmpvaW4oZmlsbENoYXIpXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVNYXNrVmFsdWUgKHJhd1ZhbCwgdXBkYXRlTWFza0ludGVybmFsc0ZsYWcsIGlucHV0VHlwZSkge1xuICAgIGNvbnN0XG4gICAgICBpbnAgPSBpbnB1dFJlZi52YWx1ZSxcbiAgICAgIGVuZCA9IGlucC5zZWxlY3Rpb25FbmQsXG4gICAgICBlbmRSZXZlcnNlID0gaW5wLnZhbHVlLmxlbmd0aCAtIGVuZCxcbiAgICAgIHVubWFza2VkID0gdW5tYXNrVmFsdWUocmF3VmFsKVxuXG4gICAgLy8gVXBkYXRlIGhlcmUgc28gdW5tYXNrIHVzZXMgdGhlIG9yaWdpbmFsIGZpbGxDaGFyXG4gICAgdXBkYXRlTWFza0ludGVybmFsc0ZsYWcgPT09IHRydWUgJiYgdXBkYXRlTWFza0ludGVybmFscygpXG5cbiAgICBjb25zdFxuICAgICAgcHJlTWFza2VkID0gbWFza1ZhbHVlKHVubWFza2VkKSxcbiAgICAgIG1hc2tlZCA9IHByb3BzLmZpbGxNYXNrICE9PSBmYWxzZVxuICAgICAgICA/IGZpbGxXaXRoTWFzayhwcmVNYXNrZWQpXG4gICAgICAgIDogcHJlTWFza2VkLFxuICAgICAgY2hhbmdlZCA9IGlubmVyVmFsdWUudmFsdWUgIT09IG1hc2tlZFxuXG4gICAgLy8gV2Ugd2FudCB0byBhdm9pZCBcImZsaWNrZXJpbmdcIiBzbyB3ZSBzZXQgdmFsdWUgaW1tZWRpYXRlbHlcbiAgICBpbnAudmFsdWUgIT09IG1hc2tlZCAmJiAoaW5wLnZhbHVlID0gbWFza2VkKVxuXG4gICAgY2hhbmdlZCA9PT0gdHJ1ZSAmJiAoaW5uZXJWYWx1ZS52YWx1ZSA9IG1hc2tlZClcblxuICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGlucCAmJiBuZXh0VGljaygoKSA9PiB7XG4gICAgICBpZiAobWFza2VkID09PSBtYXNrUmVwbGFjZWQpIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlID8gbWFza1JlcGxhY2VkLmxlbmd0aCA6IDBcbiAgICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnZm9yd2FyZCcpXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChpbnB1dFR5cGUgPT09ICdpbnNlcnRGcm9tUGFzdGUnICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBlbmQgLSAxXG4gICAgICAgIG1vdmVDdXJzb3IucmlnaHQoaW5wLCBjdXJzb3IsIGN1cnNvcilcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKFsgJ2RlbGV0ZUNvbnRlbnRCYWNrd2FyZCcsICdkZWxldGVDb250ZW50Rm9yd2FyZCcgXS5pbmRleE9mKGlucHV0VHlwZSkgPiAtMSkge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWVcbiAgICAgICAgICA/IChcbiAgICAgICAgICAgICAgZW5kID09PSAwXG4gICAgICAgICAgICAgICAgPyAobWFza2VkLmxlbmd0aCA+IHByZU1hc2tlZC5sZW5ndGggPyAxIDogMClcbiAgICAgICAgICAgICAgICA6IE1hdGgubWF4KDAsIG1hc2tlZC5sZW5ndGggLSAobWFza2VkID09PSBtYXNrUmVwbGFjZWQgPyAwIDogTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgZW5kUmV2ZXJzZSkgKyAxKSkgKyAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBlbmRcblxuICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGNoYW5nZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBNYXRoLm1heCgwLCBtYXNrZWQubGVuZ3RoIC0gKG1hc2tlZCA9PT0gbWFza1JlcGxhY2VkID8gMCA6IE1hdGgubWluKHByZU1hc2tlZC5sZW5ndGgsIGVuZFJldmVyc2UgKyAxKSkpXG5cbiAgICAgICAgICBpZiAoY3Vyc29yID09PSAxICYmIGVuZCA9PT0gMSkge1xuICAgICAgICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnZm9yd2FyZCcpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbW92ZUN1cnNvci5yaWdodFJldmVyc2UoaW5wLCBjdXJzb3IsIGN1cnNvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gbWFza2VkLmxlbmd0aCAtIGVuZFJldmVyc2VcbiAgICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdiYWNrd2FyZCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoY2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IE1hdGgubWF4KDAsIG1hc2tNYXJrZWQuaW5kZXhPZihNQVJLRVIpLCBNYXRoLm1pbihwcmVNYXNrZWQubGVuZ3RoLCBlbmQpIC0gMSlcbiAgICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgY3Vyc29yLCBjdXJzb3IpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZW5kIC0gMVxuICAgICAgICAgIG1vdmVDdXJzb3IucmlnaHQoaW5wLCBjdXJzb3IsIGN1cnNvcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCB2YWwgPSBwcm9wcy51bm1hc2tlZFZhbHVlID09PSB0cnVlXG4gICAgICA/IHVubWFza1ZhbHVlKG1hc2tlZClcbiAgICAgIDogbWFza2VkXG5cbiAgICBTdHJpbmcocHJvcHMubW9kZWxWYWx1ZSkgIT09IHZhbCAmJiBlbWl0VmFsdWUodmFsLCB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gbW92ZUN1cnNvckZvclBhc3RlIChpbnAsIHN0YXJ0LCBlbmQpIHtcbiAgICBjb25zdCBwcmVNYXNrZWQgPSBtYXNrVmFsdWUodW5tYXNrVmFsdWUoaW5wLnZhbHVlKSlcblxuICAgIHN0YXJ0ID0gTWF0aC5tYXgoMCwgbWFza01hcmtlZC5pbmRleE9mKE1BUktFUiksIE1hdGgubWluKHByZU1hc2tlZC5sZW5ndGgsIHN0YXJ0KSlcblxuICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShzdGFydCwgZW5kLCAnZm9yd2FyZCcpXG4gIH1cblxuICBjb25zdCBtb3ZlQ3Vyc29yID0ge1xuICAgIGxlZnQgKGlucCwgc3RhcnQsIGVuZCwgc2VsZWN0aW9uKSB7XG4gICAgICBjb25zdCBub01hcmtCZWZvcmUgPSBtYXNrTWFya2VkLnNsaWNlKHN0YXJ0IC0gMSkuaW5kZXhPZihNQVJLRVIpID09PSAtMVxuICAgICAgbGV0IGkgPSBNYXRoLm1heCgwLCBzdGFydCAtIDEpXG5cbiAgICAgIGZvciAoOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAobWFza01hcmtlZFsgaSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBzdGFydCA9IGlcbiAgICAgICAgICBub01hcmtCZWZvcmUgPT09IHRydWUgJiYgc3RhcnQrK1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpIDwgMFxuICAgICAgICAmJiBtYXNrTWFya2VkWyBzdGFydCBdICE9PSB2b2lkIDBcbiAgICAgICAgJiYgbWFza01hcmtlZFsgc3RhcnQgXSAhPT0gTUFSS0VSXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG1vdmVDdXJzb3IucmlnaHQoaW5wLCAwLCAwKVxuICAgICAgfVxuXG4gICAgICBzdGFydCA+PSAwICYmIGlucC5zZXRTZWxlY3Rpb25SYW5nZShcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIHNlbGVjdGlvbiA9PT0gdHJ1ZSA/IGVuZCA6IHN0YXJ0LCAnYmFja3dhcmQnXG4gICAgICApXG4gICAgfSxcblxuICAgIHJpZ2h0IChpbnAsIHN0YXJ0LCBlbmQsIHNlbGVjdGlvbikge1xuICAgICAgY29uc3QgbGltaXQgPSBpbnAudmFsdWUubGVuZ3RoXG4gICAgICBsZXQgaSA9IE1hdGgubWluKGxpbWl0LCBlbmQgKyAxKVxuXG4gICAgICBmb3IgKDsgaSA8PSBsaW1pdDsgaSsrKSB7XG4gICAgICAgIGlmIChtYXNrTWFya2VkWyBpIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIGVuZCA9IGlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1hc2tNYXJrZWRbIGkgLSAxIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIGVuZCA9IGlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPiBsaW1pdFxuICAgICAgICAmJiBtYXNrTWFya2VkWyBlbmQgLSAxIF0gIT09IHZvaWQgMFxuICAgICAgICAmJiBtYXNrTWFya2VkWyBlbmQgLSAxIF0gIT09IE1BUktFUlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBtb3ZlQ3Vyc29yLmxlZnQoaW5wLCBsaW1pdCwgbGltaXQpXG4gICAgICB9XG5cbiAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb24gPyBzdGFydCA6IGVuZCwgZW5kLCAnZm9yd2FyZCcpXG4gICAgfSxcblxuICAgIGxlZnRSZXZlcnNlIChpbnAsIHN0YXJ0LCBlbmQsIHNlbGVjdGlvbikge1xuICAgICAgY29uc3RcbiAgICAgICAgbG9jYWxNYXNrTWFya2VkID0gZ2V0UGFkZGVkTWFza01hcmtlZChpbnAudmFsdWUubGVuZ3RoKVxuICAgICAgbGV0IGkgPSBNYXRoLm1heCgwLCBzdGFydCAtIDEpXG5cbiAgICAgIGZvciAoOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAobG9jYWxNYXNrTWFya2VkWyBpIC0gMSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBzdGFydCA9IGlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxvY2FsTWFza01hcmtlZFsgaSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBzdGFydCA9IGlcbiAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpIDwgMFxuICAgICAgICAmJiBsb2NhbE1hc2tNYXJrZWRbIHN0YXJ0IF0gIT09IHZvaWQgMFxuICAgICAgICAmJiBsb2NhbE1hc2tNYXJrZWRbIHN0YXJ0IF0gIT09IE1BUktFUlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBtb3ZlQ3Vyc29yLnJpZ2h0UmV2ZXJzZShpbnAsIDAsIDApXG4gICAgICB9XG5cbiAgICAgIHN0YXJ0ID49IDAgJiYgaW5wLnNldFNlbGVjdGlvblJhbmdlKFxuICAgICAgICBzdGFydCxcbiAgICAgICAgc2VsZWN0aW9uID09PSB0cnVlID8gZW5kIDogc3RhcnQsICdiYWNrd2FyZCdcbiAgICAgIClcbiAgICB9LFxuXG4gICAgcmlnaHRSZXZlcnNlIChpbnAsIHN0YXJ0LCBlbmQsIHNlbGVjdGlvbikge1xuICAgICAgY29uc3RcbiAgICAgICAgbGltaXQgPSBpbnAudmFsdWUubGVuZ3RoLFxuICAgICAgICBsb2NhbE1hc2tNYXJrZWQgPSBnZXRQYWRkZWRNYXNrTWFya2VkKGxpbWl0KSxcbiAgICAgICAgbm9NYXJrQmVmb3JlID0gbG9jYWxNYXNrTWFya2VkLnNsaWNlKDAsIGVuZCArIDEpLmluZGV4T2YoTUFSS0VSKSA9PT0gLTFcbiAgICAgIGxldCBpID0gTWF0aC5taW4obGltaXQsIGVuZCArIDEpXG5cbiAgICAgIGZvciAoOyBpIDw9IGxpbWl0OyBpKyspIHtcbiAgICAgICAgaWYgKGxvY2FsTWFza01hcmtlZFsgaSAtIDEgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgZW5kID0gaVxuICAgICAgICAgIGVuZCA+IDAgJiYgbm9NYXJrQmVmb3JlID09PSB0cnVlICYmIGVuZC0tXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPiBsaW1pdFxuICAgICAgICAmJiBsb2NhbE1hc2tNYXJrZWRbIGVuZCAtIDEgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgZW5kIC0gMSBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5sZWZ0UmV2ZXJzZShpbnAsIGxpbWl0LCBsaW1pdClcbiAgICAgIH1cblxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvbiA9PT0gdHJ1ZSA/IHN0YXJ0IDogZW5kLCBlbmQsICdmb3J3YXJkJylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbk1hc2tlZEtleWRvd24gKGUpIHtcbiAgICBlbWl0KCdrZXlkb3duJywgZSlcblxuICAgIGlmIChzaG91bGRJZ25vcmVLZXkoZSkgPT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0XG4gICAgICBpbnAgPSBpbnB1dFJlZi52YWx1ZSxcbiAgICAgIHN0YXJ0ID0gaW5wLnNlbGVjdGlvblN0YXJ0LFxuICAgICAgZW5kID0gaW5wLnNlbGVjdGlvbkVuZFxuXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMzcgfHwgZS5rZXlDb2RlID09PSAzOSkgeyAvLyBMZWZ0IC8gUmlnaHRcbiAgICAgIGNvbnN0IGZuID0gbW92ZUN1cnNvclsgKGUua2V5Q29kZSA9PT0gMzkgPyAncmlnaHQnIDogJ2xlZnQnKSArIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgPyAnUmV2ZXJzZScgOiAnJykgXVxuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGZuKGlucCwgc3RhcnQsIGVuZCwgZS5zaGlmdEtleSlcbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLmtleUNvZGUgPT09IDggLy8gQmFja3NwYWNlXG4gICAgICAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgIT09IHRydWVcbiAgICAgICYmIHN0YXJ0ID09PSBlbmRcbiAgICApIHtcbiAgICAgIG1vdmVDdXJzb3IubGVmdChpbnAsIHN0YXJ0LCBlbmQsIHRydWUpXG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgZS5rZXlDb2RlID09PSA0NiAvLyBEZWxldGVcbiAgICAgICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZVxuICAgICAgJiYgc3RhcnQgPT09IGVuZFxuICAgICkge1xuICAgICAgbW92ZUN1cnNvci5yaWdodFJldmVyc2UoaW5wLCBzdGFydCwgZW5kLCB0cnVlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hc2tWYWx1ZSAodmFsKSB7XG4gICAgaWYgKHZhbCA9PT0gdm9pZCAwIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09ICcnKSB7IHJldHVybiAnJyB9XG5cbiAgICBpZiAocHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gbWFza1ZhbHVlUmV2ZXJzZSh2YWwpXG4gICAgfVxuXG4gICAgY29uc3QgbWFzayA9IGNvbXB1dGVkTWFza1xuXG4gICAgbGV0IHZhbEluZGV4ID0gMCwgb3V0cHV0ID0gJydcblxuICAgIGZvciAobGV0IG1hc2tJbmRleCA9IDA7IG1hc2tJbmRleCA8IG1hc2subGVuZ3RoOyBtYXNrSW5kZXgrKykge1xuICAgICAgY29uc3RcbiAgICAgICAgdmFsQ2hhciA9IHZhbFsgdmFsSW5kZXggXSxcbiAgICAgICAgbWFza0RlZiA9IG1hc2tbIG1hc2tJbmRleCBdXG5cbiAgICAgIGlmICh0eXBlb2YgbWFza0RlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb3V0cHV0ICs9IG1hc2tEZWZcbiAgICAgICAgdmFsQ2hhciA9PT0gbWFza0RlZiAmJiB2YWxJbmRleCsrXG4gICAgICB9XG4gICAgICBlbHNlIGlmICh2YWxDaGFyICE9PSB2b2lkIDAgJiYgbWFza0RlZi5yZWdleC50ZXN0KHZhbENoYXIpKSB7XG4gICAgICAgIG91dHB1dCArPSBtYXNrRGVmLnRyYW5zZm9ybSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBtYXNrRGVmLnRyYW5zZm9ybSh2YWxDaGFyKVxuICAgICAgICAgIDogdmFsQ2hhclxuICAgICAgICB2YWxJbmRleCsrXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXRcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hc2tWYWx1ZVJldmVyc2UgKHZhbCkge1xuICAgIGNvbnN0XG4gICAgICBtYXNrID0gY29tcHV0ZWRNYXNrLFxuICAgICAgZmlyc3RUb2tlbkluZGV4ID0gbWFza01hcmtlZC5pbmRleE9mKE1BUktFUilcblxuICAgIGxldCB2YWxJbmRleCA9IHZhbC5sZW5ndGggLSAxLCBvdXRwdXQgPSAnJ1xuXG4gICAgZm9yIChsZXQgbWFza0luZGV4ID0gbWFzay5sZW5ndGggLSAxOyBtYXNrSW5kZXggPj0gMCAmJiB2YWxJbmRleCA+IC0xOyBtYXNrSW5kZXgtLSkge1xuICAgICAgY29uc3QgbWFza0RlZiA9IG1hc2tbIG1hc2tJbmRleCBdXG5cbiAgICAgIGxldCB2YWxDaGFyID0gdmFsWyB2YWxJbmRleCBdXG5cbiAgICAgIGlmICh0eXBlb2YgbWFza0RlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb3V0cHV0ID0gbWFza0RlZiArIG91dHB1dFxuICAgICAgICB2YWxDaGFyID09PSBtYXNrRGVmICYmIHZhbEluZGV4LS1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHZhbENoYXIgIT09IHZvaWQgMCAmJiBtYXNrRGVmLnJlZ2V4LnRlc3QodmFsQ2hhcikpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIG91dHB1dCA9IChtYXNrRGVmLnRyYW5zZm9ybSAhPT0gdm9pZCAwID8gbWFza0RlZi50cmFuc2Zvcm0odmFsQ2hhcikgOiB2YWxDaGFyKSArIG91dHB1dFxuICAgICAgICAgIHZhbEluZGV4LS1cbiAgICAgICAgICB2YWxDaGFyID0gdmFsWyB2YWxJbmRleCBdXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bm1vZGlmaWVkLWxvb3AtY29uZGl0aW9uXG4gICAgICAgIH0gd2hpbGUgKGZpcnN0VG9rZW5JbmRleCA9PT0gbWFza0luZGV4ICYmIHZhbENoYXIgIT09IHZvaWQgMCAmJiBtYXNrRGVmLnJlZ2V4LnRlc3QodmFsQ2hhcikpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXRcbiAgfVxuXG4gIGZ1bmN0aW9uIHVubWFza1ZhbHVlICh2YWwpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3N0cmluZycgfHwgY29tcHV0ZWRVbm1hc2sgPT09IHZvaWQgMFxuICAgICAgPyAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicgPyBjb21wdXRlZFVubWFzaygnJyArIHZhbCkgOiB2YWwpXG4gICAgICA6IGNvbXB1dGVkVW5tYXNrKHZhbClcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGxXaXRoTWFzayAodmFsKSB7XG4gICAgaWYgKG1hc2tSZXBsYWNlZC5sZW5ndGggLSB2YWwubGVuZ3RoIDw9IDApIHtcbiAgICAgIHJldHVybiB2YWxcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlICYmIHZhbC5sZW5ndGggPiAwXG4gICAgICA/IG1hc2tSZXBsYWNlZC5zbGljZSgwLCAtdmFsLmxlbmd0aCkgKyB2YWxcbiAgICAgIDogdmFsICsgbWFza1JlcGxhY2VkLnNsaWNlKHZhbC5sZW5ndGgpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlubmVyVmFsdWUsXG4gICAgaGFzTWFzayxcbiAgICBtb3ZlQ3Vyc29yRm9yUGFzdGUsXG4gICAgdXBkYXRlTWFza1ZhbHVlLFxuICAgIG9uTWFza2VkS2V5ZG93blxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IHVzZUZvcm1Qcm9wcyA9IHtcbiAgbmFtZTogU3RyaW5nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb3JtQXR0cnMgKHByb3BzKSB7XG4gIHJldHVybiBjb21wdXRlZCgoKSA9PiAoe1xuICAgIHR5cGU6ICdoaWRkZW4nLFxuICAgIG5hbWU6IHByb3BzLm5hbWUsXG4gICAgdmFsdWU6IHByb3BzLm1vZGVsVmFsdWVcbiAgfSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb3JtSW5qZWN0IChmb3JtQXR0cnMgPSB7fSkge1xuICByZXR1cm4gKGNoaWxkLCBhY3Rpb24sIGNsYXNzTmFtZSkgPT4ge1xuICAgIGNoaWxkWyBhY3Rpb24gXShcbiAgICAgIGgoJ2lucHV0Jywge1xuICAgICAgICBjbGFzczogJ2hpZGRlbicgKyAoY2xhc3NOYW1lIHx8ICcnKSxcbiAgICAgICAgLi4uZm9ybUF0dHJzLnZhbHVlXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRm9ybUlucHV0TmFtZUF0dHIgKHByb3BzKSB7XG4gIHJldHVybiBjb21wdXRlZCgoKSA9PiBwcm9wcy5uYW1lIHx8IHByb3BzLmZvcilcbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHR5cGVHdWFyZCkge1xuICBmdW5jdGlvbiBnZXRGb3JtRG9tUHJvcHMgKCkge1xuICAgIGNvbnN0IG1vZGVsID0gcHJvcHMubW9kZWxWYWx1ZVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGR0ID0gJ0RhdGFUcmFuc2ZlcicgaW4gd2luZG93XG4gICAgICAgID8gbmV3IERhdGFUcmFuc2ZlcigpXG4gICAgICAgIDogKCdDbGlwYm9hcmRFdmVudCcgaW4gd2luZG93XG4gICAgICAgICAgICA/IG5ldyBDbGlwYm9hcmRFdmVudCgnJykuY2xpcGJvYXJkRGF0YVxuICAgICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgICApXG5cbiAgICAgIGlmIChPYmplY3QobW9kZWwpID09PSBtb2RlbCkge1xuICAgICAgICAoJ2xlbmd0aCcgaW4gbW9kZWxcbiAgICAgICAgICA/IEFycmF5LmZyb20obW9kZWwpXG4gICAgICAgICAgOiBbIG1vZGVsIF1cbiAgICAgICAgKS5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgICAgIGR0Lml0ZW1zLmFkZChmaWxlKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBmaWxlczogZHQuZmlsZXNcbiAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZpbGVzOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHlwZUd1YXJkID09PSB0cnVlXG4gICAgPyBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMudHlwZSAhPT0gJ2ZpbGUnKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0Rm9ybURvbVByb3BzKClcbiAgICB9KVxuICAgIDogY29tcHV0ZWQoZ2V0Rm9ybURvbVByb3BzKVxufVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxuY29uc3QgaXNKYXBhbmVzZSA9IC9bXFx1MzAwMC1cXHUzMDNmXFx1MzA0MC1cXHUzMDlmXFx1MzBhMC1cXHUzMGZmXFx1ZmYwMC1cXHVmZjlmXFx1NGUwMC1cXHU5ZmFmXFx1MzQwMC1cXHU0ZGJmXS9cbmNvbnN0IGlzQ2hpbmVzZSA9IC9bXFx1NGUwMC1cXHU5ZmZmXFx1MzQwMC1cXHU0ZGJmXFx1ezIwMDAwfS1cXHV7MmE2ZGZ9XFx1ezJhNzAwfS1cXHV7MmI3M2Z9XFx1ezJiNzQwfS1cXHV7MmI4MWZ9XFx1ezJiODIwfS1cXHV7MmNlYWZ9XFx1ZjkwMC1cXHVmYWZmXFx1MzMwMC1cXHUzM2ZmXFx1ZmUzMC1cXHVmZTRmXFx1ZjkwMC1cXHVmYWZmXFx1ezJmODAwfS1cXHV7MmZhMWZ9XS91XG5jb25zdCBpc0tvcmVhbiA9IC9bXFx1MzEzMS1cXHUzMTRlXFx1MzE0Zi1cXHUzMTYzXFx1YWMwMC1cXHVkN2EzXS9cbmNvbnN0IGlzUGxhaW5UZXh0ID0gL1thLXowLTlfIC1dJC9pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvbklucHV0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBvbkNvbXBvc2l0aW9uIChlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2NvbXBvc2l0aW9uZW5kJyB8fCBlLnR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICBpZiAoZS50YXJnZXQucUNvbXBvc2luZyAhPT0gdHJ1ZSkgeyByZXR1cm4gfVxuICAgICAgZS50YXJnZXQucUNvbXBvc2luZyA9IGZhbHNlXG4gICAgICBvbklucHV0KGUpXG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgZS50eXBlID09PSAnY29tcG9zaXRpb251cGRhdGUnXG4gICAgICAmJiBlLnRhcmdldC5xQ29tcG9zaW5nICE9PSB0cnVlXG4gICAgICAmJiB0eXBlb2YgZS5kYXRhID09PSAnc3RyaW5nJ1xuICAgICkge1xuICAgICAgY29uc3QgaXNDb21wb3NpbmcgPSBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZVxuICAgICAgICA/IGlzUGxhaW5UZXh0LnRlc3QoZS5kYXRhKSA9PT0gZmFsc2VcbiAgICAgICAgOiBpc0phcGFuZXNlLnRlc3QoZS5kYXRhKSA9PT0gdHJ1ZSB8fCBpc0NoaW5lc2UudGVzdChlLmRhdGEpID09PSB0cnVlIHx8IGlzS29yZWFuLnRlc3QoZS5kYXRhKSA9PT0gdHJ1ZVxuXG4gICAgICBpZiAoaXNDb21wb3NpbmcgPT09IHRydWUpIHtcbiAgICAgICAgZS50YXJnZXQucUNvbXBvc2luZyA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQsIG9uTW91bnRlZCwgbmV4dFRpY2ssIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUZpZWxkLCB7IHVzZUZpZWxkU3RhdGUsIHVzZUZpZWxkUHJvcHMsIHVzZUZpZWxkRW1pdHMsIGZpZWxkVmFsdWVJc0ZpbGxlZCB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpZWxkLmpzJ1xuaW1wb3J0IHVzZU1hc2ssIHsgdXNlTWFza1Byb3BzIH0gZnJvbSAnLi91c2UtbWFzay5qcydcbmltcG9ydCB7IHVzZUZvcm1Qcm9wcywgdXNlRm9ybUlucHV0TmFtZUF0dHIgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1mb3JtLmpzJ1xuaW1wb3J0IHVzZUZpbGVGb3JtRG9tUHJvcHMgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmlsZS1kb20tcHJvcHMuanMnXG5pbXBvcnQgdXNlS2V5Q29tcG9zaXRpb24gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Uta2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IHN0b3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5pbXBvcnQgeyBpbmplY3RQcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9pbmplY3Qtb2JqLXByb3AuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSW5wdXQnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VGaWVsZFByb3BzLFxuICAgIC4uLnVzZU1hc2tQcm9wcyxcbiAgICAuLi51c2VGb3JtUHJvcHMsXG5cbiAgICBtb2RlbFZhbHVlOiB7IHJlcXVpcmVkOiBmYWxzZSB9LFxuXG4gICAgc2hhZG93VGV4dDogU3RyaW5nLFxuXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RleHQnXG4gICAgfSxcblxuICAgIGRlYm91bmNlOiBbIFN0cmluZywgTnVtYmVyIF0sXG5cbiAgICBhdXRvZ3JvdzogQm9vbGVhbiwgLy8gbWFrZXMgYSB0ZXh0YXJlYVxuXG4gICAgaW5wdXRDbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBpbnB1dFN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VGaWVsZEVtaXRzLFxuICAgICdwYXN0ZScsICdjaGFuZ2UnLFxuICAgICdrZXlkb3duJywgJ2FuaW1hdGlvbmVuZCdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCwgYXR0cnMgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IHRlbXAgPSB7fVxuICAgIGxldCBlbWl0Q2FjaGVkVmFsdWUgPSBOYU4sIHR5cGVkTnVtYmVyLCBzdG9wVmFsdWVXYXRjaGVyLCBlbWl0VGltZXIgPSBudWxsLCBlbWl0VmFsdWVGblxuXG4gICAgY29uc3QgaW5wdXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBuYW1lUHJvcCA9IHVzZUZvcm1JbnB1dE5hbWVBdHRyKHByb3BzKVxuXG4gICAgY29uc3Qge1xuICAgICAgaW5uZXJWYWx1ZSxcbiAgICAgIGhhc01hc2ssXG4gICAgICBtb3ZlQ3Vyc29yRm9yUGFzdGUsXG4gICAgICB1cGRhdGVNYXNrVmFsdWUsXG4gICAgICBvbk1hc2tlZEtleWRvd25cbiAgICB9ID0gdXNlTWFzayhwcm9wcywgZW1pdCwgZW1pdFZhbHVlLCBpbnB1dFJlZilcblxuICAgIGNvbnN0IGZvcm1Eb21Qcm9wcyA9IHVzZUZpbGVGb3JtRG9tUHJvcHMocHJvcHMsIC8qIHR5cGUgZ3VhcmQgKi8gdHJ1ZSlcbiAgICBjb25zdCBoYXNWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGZpZWxkVmFsdWVJc0ZpbGxlZChpbm5lclZhbHVlLnZhbHVlKSlcblxuICAgIGNvbnN0IG9uQ29tcG9zaXRpb24gPSB1c2VLZXlDb21wb3NpdGlvbihvbklucHV0KVxuXG4gICAgY29uc3Qgc3RhdGUgPSB1c2VGaWVsZFN0YXRlKClcblxuICAgIGNvbnN0IGlzVGV4dGFyZWEgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMudHlwZSA9PT0gJ3RleHRhcmVhJyB8fCBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGlzVHlwZVRleHQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgfHwgWyAndGV4dCcsICdzZWFyY2gnLCAndXJsJywgJ3RlbCcsICdwYXNzd29yZCcgXS5pbmNsdWRlcyhwcm9wcy50eXBlKVxuICAgIClcblxuICAgIGNvbnN0IG9uRXZlbnRzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgZXZ0ID0ge1xuICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmxpc3RlbmVycy52YWx1ZSxcbiAgICAgICAgb25JbnB1dCxcbiAgICAgICAgb25QYXN0ZSxcbiAgICAgICAgLy8gU2FmYXJpIDwgMTAuMiAmIFVJV2ViVmlldyBkb2Vzbid0IGZpcmUgY29tcG9zaXRpb25lbmQgd2hlblxuICAgICAgICAvLyBzd2l0Y2hpbmcgZm9jdXMgYmVmb3JlIGNvbmZpcm1pbmcgY29tcG9zaXRpb24gY2hvaWNlXG4gICAgICAgIC8vIHRoaXMgYWxzbyBmaXhlcyB0aGUgaXNzdWUgd2hlcmUgc29tZSBicm93c2VycyBlLmcuIGlPUyBDaHJvbWVcbiAgICAgICAgLy8gZmlyZXMgXCJjaGFuZ2VcIiBpbnN0ZWFkIG9mIFwiaW5wdXRcIiBvbiBhdXRvY29tcGxldGUuXG4gICAgICAgIG9uQ2hhbmdlLFxuICAgICAgICBvbkJsdXI6IG9uRmluaXNoRWRpdGluZyxcbiAgICAgICAgb25Gb2N1czogc3RvcFxuICAgICAgfVxuXG4gICAgICBldnQub25Db21wb3NpdGlvbnN0YXJ0ID0gZXZ0Lm9uQ29tcG9zaXRpb251cGRhdGUgPSBldnQub25Db21wb3NpdGlvbmVuZCA9IG9uQ29tcG9zaXRpb25cblxuICAgICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgZXZ0Lm9uS2V5ZG93biA9IG9uTWFza2VkS2V5ZG93blxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuYXV0b2dyb3cgPT09IHRydWUpIHtcbiAgICAgICAgZXZ0Lm9uQW5pbWF0aW9uZW5kID0gb25BbmltYXRpb25lbmRcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV2dFxuICAgIH0pXG5cbiAgICBjb25zdCBpbnB1dEF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICAgIHRhYmluZGV4OiAwLFxuICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICByb3dzOiBwcm9wcy50eXBlID09PSAndGV4dGFyZWEnID8gNiA6IHZvaWQgMCxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5sYWJlbCxcbiAgICAgICAgbmFtZTogbmFtZVByb3AudmFsdWUsXG4gICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgICAgaWQ6IHN0YXRlLnRhcmdldFVpZC52YWx1ZSxcbiAgICAgICAgbWF4bGVuZ3RoOiBwcm9wcy5tYXhsZW5ndGgsXG4gICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlID09PSB0cnVlLFxuICAgICAgICByZWFkb25seTogcHJvcHMucmVhZG9ubHkgPT09IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKGlzVGV4dGFyZWEudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGF0dHJzLnR5cGUgPSBwcm9wcy50eXBlXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSkge1xuICAgICAgICBhdHRycy5yb3dzID0gMVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXR0cnNcbiAgICB9KVxuXG4gICAgLy8gc29tZSBicm93c2VycyBsb3NlIHRoZSBuYXRpdmUgaW5wdXQgdmFsdWVcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIHJlYXR0YWNoIGl0IGR5bmFtaWNhbGx5XG4gICAgLy8gKGxpa2UgdHlwZT1cInBhc3N3b3JkXCIgPC0+IHR5cGU9XCJ0ZXh0XCI7IHNlZSAjMTIwNzgpXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMudHlwZSwgKCkgPT4ge1xuICAgICAgaWYgKGlucHV0UmVmLnZhbHVlKSB7XG4gICAgICAgIGlucHV0UmVmLnZhbHVlLnZhbHVlID0gcHJvcHMubW9kZWxWYWx1ZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCB2ID0+IHtcbiAgICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChzdG9wVmFsdWVXYXRjaGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgc3RvcFZhbHVlV2F0Y2hlciA9IGZhbHNlXG5cbiAgICAgICAgICBpZiAoU3RyaW5nKHYpID09PSBlbWl0Q2FjaGVkVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZU1hc2tWYWx1ZSh2KVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaW5uZXJWYWx1ZS52YWx1ZSAhPT0gdikge1xuICAgICAgICBpbm5lclZhbHVlLnZhbHVlID0gdlxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9wcy50eXBlID09PSAnbnVtYmVyJ1xuICAgICAgICAgICYmIHRlbXAuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgPT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHR5cGVkTnVtYmVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0eXBlZE51bWJlciA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRlbXAudmFsdWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdGV4dGFyZWEgb25seVxuICAgICAgcHJvcHMuYXV0b2dyb3cgPT09IHRydWUgJiYgbmV4dFRpY2soYWRqdXN0SGVpZ2h0KVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5hdXRvZ3JvdywgdmFsID0+IHtcbiAgICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgbmV4dFRpY2soYWRqdXN0SGVpZ2h0KVxuICAgICAgfVxuICAgICAgLy8gaWYgaXQgaGFzIGEgbnVtYmVyIG9mIHJvd3Mgc2V0IHJlc3BlY3QgaXRcbiAgICAgIGVsc2UgaWYgKGlucHV0UmVmLnZhbHVlICE9PSBudWxsICYmIGF0dHJzLnJvd3MgPiAwKSB7XG4gICAgICAgIGlucHV0UmVmLnZhbHVlLnN0eWxlLmhlaWdodCA9ICdhdXRvJ1xuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5kZW5zZSwgKCkgPT4ge1xuICAgICAgcHJvcHMuYXV0b2dyb3cgPT09IHRydWUgJiYgbmV4dFRpY2soYWRqdXN0SGVpZ2h0KVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgICBhZGRGb2N1c0ZuKCgpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpbnB1dFJlZi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICAgICYmIGlucHV0UmVmLnZhbHVlICE9PSBlbFxuICAgICAgICAgICYmIChlbCA9PT0gbnVsbCB8fCBlbC5pZCAhPT0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlKVxuICAgICAgICApIHtcbiAgICAgICAgICBpbnB1dFJlZi52YWx1ZS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZWxlY3QgKCkge1xuICAgICAgaW5wdXRSZWYudmFsdWUgIT09IG51bGwgJiYgaW5wdXRSZWYudmFsdWUuc2VsZWN0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhc3RlIChlKSB7XG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgIT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgaW5wID0gZS50YXJnZXRcbiAgICAgICAgbW92ZUN1cnNvckZvclBhc3RlKGlucCwgaW5wLnNlbGVjdGlvblN0YXJ0LCBpbnAuc2VsZWN0aW9uRW5kKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdwYXN0ZScsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25JbnB1dCAoZSkge1xuICAgICAgaWYgKCFlIHx8ICFlLnRhcmdldCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGUudGFyZ2V0LmZpbGVzKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsID0gZS50YXJnZXQudmFsdWVcblxuICAgICAgaWYgKGUudGFyZ2V0LnFDb21wb3NpbmcgPT09IHRydWUpIHtcbiAgICAgICAgdGVtcC52YWx1ZSA9IHZhbFxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB1cGRhdGVNYXNrVmFsdWUodmFsLCBmYWxzZSwgZS5pbnB1dFR5cGUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZW1pdFZhbHVlKHZhbClcblxuICAgICAgICBpZiAoaXNUeXBlVGV4dC52YWx1ZSA9PT0gdHJ1ZSAmJiBlLnRhcmdldCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgIGNvbnN0IHsgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCB9ID0gZS50YXJnZXRcblxuICAgICAgICAgIGlmIChzZWxlY3Rpb25TdGFydCAhPT0gdm9pZCAwICYmIHNlbGVjdGlvbkVuZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiB2YWwuaW5kZXhPZihlLnRhcmdldC52YWx1ZSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHRyaWdnZXIgaXQgaW1tZWRpYXRlbHkgdG9vLFxuICAgICAgLy8gdG8gYXZvaWQgXCJmbGlja2VyaW5nXCJcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIGFkanVzdEhlaWdodCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25BbmltYXRpb25lbmQgKGUpIHtcbiAgICAgIGVtaXQoJ2FuaW1hdGlvbmVuZCcsIGUpXG4gICAgICBhZGp1c3RIZWlnaHQoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRWYWx1ZSAodmFsLCBzdG9wV2F0Y2hlcikge1xuICAgICAgZW1pdFZhbHVlRm4gPSAoKSA9PiB7XG4gICAgICAgIGVtaXRUaW1lciA9IG51bGxcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMudHlwZSAhPT0gJ251bWJlcidcbiAgICAgICAgICAmJiB0ZW1wLmhhc093blByb3BlcnR5KCd2YWx1ZScpID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGRlbGV0ZSB0ZW1wLnZhbHVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSAhPT0gdmFsICYmIGVtaXRDYWNoZWRWYWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgICAgZW1pdENhY2hlZFZhbHVlID0gdmFsXG5cbiAgICAgICAgICBzdG9wV2F0Y2hlciA9PT0gdHJ1ZSAmJiAoc3RvcFZhbHVlV2F0Y2hlciA9IHRydWUpXG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWwpXG5cbiAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICBlbWl0Q2FjaGVkVmFsdWUgPT09IHZhbCAmJiAoZW1pdENhY2hlZFZhbHVlID0gTmFOKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0VmFsdWVGbiA9IHZvaWQgMFxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMudHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdHlwZWROdW1iZXIgPSB0cnVlXG4gICAgICAgIHRlbXAudmFsdWUgPSB2YWxcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmRlYm91bmNlICE9PSB2b2lkIDApIHtcbiAgICAgICAgZW1pdFRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChlbWl0VGltZXIpXG4gICAgICAgIHRlbXAudmFsdWUgPSB2YWxcbiAgICAgICAgZW1pdFRpbWVyID0gc2V0VGltZW91dChlbWl0VmFsdWVGbiwgcHJvcHMuZGVib3VuY2UpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZW1pdFZhbHVlRm4oKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICBmdW5jdGlvbiBhZGp1c3RIZWlnaHQgKCkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgY29uc3QgaW5wID0gaW5wdXRSZWYudmFsdWVcbiAgICAgICAgaWYgKGlucCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHBhcmVudFN0eWxlID0gaW5wLnBhcmVudE5vZGUuc3R5bGVcbiAgICAgICAgICBjb25zdCB7IG92ZXJmbG93IH0gPSBpbnAuc3R5bGVcblxuICAgICAgICAgIC8vIHJlc2V0IGhlaWdodCBvZiB0ZXh0YXJlYSB0byBhIHNtYWxsIHNpemUgdG8gZGV0ZWN0IHRoZSByZWFsIGhlaWdodFxuICAgICAgICAgIC8vIGJ1dCBrZWVwIHRoZSB0b3RhbCBjb250cm9sIHNpemUgdGhlIHNhbWVcbiAgICAgICAgICAvLyBGaXJlZm94IHJ1bGV6ICMxNDI2MywgIzE0MzQ0XG4gICAgICAgICAgJHEucGxhdGZvcm0uaXMuZmlyZWZveCAhPT0gdHJ1ZSAmJiAoaW5wLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbicpXG4gICAgICAgICAgcGFyZW50U3R5bGUubWFyZ2luQm90dG9tID0gKGlucC5zY3JvbGxIZWlnaHQgLSAxKSArICdweCdcbiAgICAgICAgICBpbnAuc3R5bGUuaGVpZ2h0ID0gJzFweCdcblxuICAgICAgICAgIGlucC5zdHlsZS5oZWlnaHQgPSBpbnAuc2Nyb2xsSGVpZ2h0ICsgJ3B4J1xuICAgICAgICAgIGlucC5zdHlsZS5vdmVyZmxvdyA9IG92ZXJmbG93XG4gICAgICAgICAgcGFyZW50U3R5bGUubWFyZ2luQm90dG9tID0gJydcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNoYW5nZSAoZSkge1xuICAgICAgb25Db21wb3NpdGlvbihlKVxuXG4gICAgICBpZiAoZW1pdFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChlbWl0VGltZXIpXG4gICAgICAgIGVtaXRUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgZW1pdFZhbHVlRm4gIT09IHZvaWQgMCAmJiBlbWl0VmFsdWVGbigpXG5cbiAgICAgIGVtaXQoJ2NoYW5nZScsIGUudGFyZ2V0LnZhbHVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRmluaXNoRWRpdGluZyAoZSkge1xuICAgICAgZSAhPT0gdm9pZCAwICYmIHN0b3AoZSlcblxuICAgICAgaWYgKGVtaXRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZW1pdFRpbWVyKVxuICAgICAgICBlbWl0VGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGVtaXRWYWx1ZUZuICE9PSB2b2lkIDAgJiYgZW1pdFZhbHVlRm4oKVxuXG4gICAgICB0eXBlZE51bWJlciA9IGZhbHNlXG4gICAgICBzdG9wVmFsdWVXYXRjaGVyID0gZmFsc2VcbiAgICAgIGRlbGV0ZSB0ZW1wLnZhbHVlXG5cbiAgICAgIC8vIHdlIG5lZWQgdG8gdXNlIHNldFRpbWVvdXQgaW5zdGVhZCBvZiB0aGlzLiRuZXh0VGlja1xuICAgICAgLy8gdG8gYXZvaWQgYSBidWcgd2hlcmUgZm9jdXNvdXQgaXMgbm90IGVtaXR0ZWQgZm9yIHR5cGUgZGF0ZS90aW1lL3dlZWsvLi4uXG4gICAgICBwcm9wcy50eXBlICE9PSAnZmlsZScgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChpbnB1dFJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlucHV0UmVmLnZhbHVlLnZhbHVlID0gaW5uZXJWYWx1ZS52YWx1ZSAhPT0gdm9pZCAwID8gaW5uZXJWYWx1ZS52YWx1ZSA6ICcnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q3VyVmFsdWUgKCkge1xuICAgICAgcmV0dXJuIHRlbXAuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgPT09IHRydWVcbiAgICAgICAgPyB0ZW1wLnZhbHVlXG4gICAgICAgIDogKGlubmVyVmFsdWUudmFsdWUgIT09IHZvaWQgMCA/IGlubmVyVmFsdWUudmFsdWUgOiAnJylcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgb25GaW5pc2hFZGl0aW5nKClcbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIGFkanVzdEhlaWdodCgpXG4gICAgfSlcblxuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICAgIGlubmVyVmFsdWUsXG5cbiAgICAgIGZpZWxkQ2xhc3M6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIGBxLSR7IGlzVGV4dGFyZWEudmFsdWUgPT09IHRydWUgPyAndGV4dGFyZWEnIDogJ2lucHV0JyB9YFxuICAgICAgICArIChwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSA/ICcgcS10ZXh0YXJlYS0tYXV0b2dyb3cnIDogJycpXG4gICAgICApLFxuXG4gICAgICBoYXNTaGFkb3c6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIHByb3BzLnR5cGUgIT09ICdmaWxlJ1xuICAgICAgICAmJiB0eXBlb2YgcHJvcHMuc2hhZG93VGV4dCA9PT0gJ3N0cmluZydcbiAgICAgICAgJiYgcHJvcHMuc2hhZG93VGV4dC5sZW5ndGggPiAwXG4gICAgICApLFxuXG4gICAgICBpbnB1dFJlZixcblxuICAgICAgZW1pdFZhbHVlLFxuXG4gICAgICBoYXNWYWx1ZSxcblxuICAgICAgZmxvYXRpbmdMYWJlbDogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgaGFzVmFsdWUudmFsdWUgPT09IHRydWVcbiAgICAgICAgfHwgZmllbGRWYWx1ZUlzRmlsbGVkKHByb3BzLmRpc3BsYXlWYWx1ZSlcbiAgICAgICksXG5cbiAgICAgIGdldENvbnRyb2w6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGgoaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZSA/ICd0ZXh0YXJlYScgOiAnaW5wdXQnLCB7XG4gICAgICAgICAgcmVmOiBpbnB1dFJlZixcbiAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgJ3EtZmllbGRfX25hdGl2ZSBxLXBsYWNlaG9sZGVyJyxcbiAgICAgICAgICAgIHByb3BzLmlucHV0Q2xhc3NcbiAgICAgICAgICBdLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy5pbnB1dFN0eWxlLFxuICAgICAgICAgIC4uLmlucHV0QXR0cnMudmFsdWUsXG4gICAgICAgICAgLi4ub25FdmVudHMudmFsdWUsXG4gICAgICAgICAgLi4uKFxuICAgICAgICAgICAgcHJvcHMudHlwZSAhPT0gJ2ZpbGUnXG4gICAgICAgICAgICAgID8geyB2YWx1ZTogZ2V0Q3VyVmFsdWUoKSB9XG4gICAgICAgICAgICAgIDogZm9ybURvbVByb3BzLnZhbHVlXG4gICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgfSxcblxuICAgICAgZ2V0U2hhZG93Q29udHJvbDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fbmF0aXZlIHEtZmllbGRfX3NoYWRvdyBhYnNvbHV0ZS1ib3R0b20gbm8tcG9pbnRlci1ldmVudHMnXG4gICAgICAgICAgICArIChpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlID8gJycgOiAnIHRleHQtbm8td3JhcCcpXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCdzcGFuJywgeyBjbGFzczogJ2ludmlzaWJsZScgfSwgZ2V0Q3VyVmFsdWUoKSksXG4gICAgICAgICAgaCgnc3BhbicsIHByb3BzLnNoYWRvd1RleHQpXG4gICAgICAgIF0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlbmRlckZuID0gdXNlRmllbGQoc3RhdGUpXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgICBmb2N1cyxcbiAgICAgIHNlbGVjdCxcbiAgICAgIGdldE5hdGl2ZUVsZW1lbnQ6ICgpID0+IGlucHV0UmVmLnZhbHVlIC8vIGRlcHJlY2F0ZWRcbiAgICB9KVxuXG4gICAgaW5qZWN0UHJvcChwcm94eSwgJ25hdGl2ZUVsJywgKCkgPT4gaW5wdXRSZWYudmFsdWUpXG5cbiAgICByZXR1cm4gcmVuZGVyRm5cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cImNvbnN0cmFpbi1tb3JlIHEtcGEtbWRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY2FtZXJhLWZyYW1lIHEtcGEtbWRcIj5cbiAgICAgIDx2aWRlb1xuICAgICAgICByZWY9XCJ2aWRlb1wiXG4gICAgICAgIGNsYXNzPVwiZnVsbC13aWR0aFwiXG4gICAgICAgIGF1dG9wbGF5XG4gICAgICAgIC8+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyIHEtcGEtbWRcIj5cbiAgICAgIDxxLWJ0blxuICAgICAgICBjb2xvcj1cImdyZXktMTBcIlxuICAgICAgICBpY29uPVwiZXZhLWNhbWVyYVwiXG4gICAgICAgIHNpemU9XCJsZ1wiXG4gICAgICAgIHJvdW5kIC8+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWNlbnRlciBxLW1hLW1kXCI+XG4gICAgICA8cS1pbnB1dFxuICAgICAgICB2LW1vZGVsPVwicG9zdC5jYXB0aW9uXCJcbiAgICAgICAgY2xhc3M9XCJjb2wgY29sLXNtLTZcIlxuICAgICAgICBsYWJlbD1cIkNhcHRpb25cIlxuICAgICAgICBkZW5zZSAvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1jZW50ZXIgcS1tYS1tZFwiPlxuICAgICAgPHEtaW5wdXRcbiAgICAgICAgdi1tb2RlbD1cInBvc3QubG9jYXRpb25cIlxuICAgICAgICBjbGFzcz1cImNvbCBjb2wtc20tNlwiXG4gICAgICAgIGxhYmVsPVwiTG9jYXRpb25cIlxuICAgICAgICBkZW5zZT5cbiAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgPHEtYnRuIHJvdW5kIGRlbnNlIGZsYXQgaWNvbj1cImV2YS1uYXZpZ2F0aW9uLTItb3V0bGluZVwiIC8+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3EtaW5wdXQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWNlbnRlciBxLW10LWxnXCI+XG4gICAgICA8cS1idG4gdW5lbGV2YXRlZCByb3VuZGVkIGNvbG9yPVwicHJpbWFyeVwiIGxhYmVsPVwiUG9zdGFyIGltYWdlbVwiIC8+XG4gICAgPC9kaXY+XG5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgZGVmaW5lQ29tcG9uZW50IH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgdWlkIH0gZnJvbSAncXVhc2FyJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAnUGFnZUNhbWVyYScsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybntcbiAgICAgIHBvc3Q6e1xuICAgICAgICBpZDogdWlkICgpLFxuICAgICAgICBjYXB0aW9uOiAnJyxcbiAgICAgICAgbG9jYXRpb246ICcnLFxuICAgICAgICBwaG90bzogbnVsbCxcbiAgICAgICAgZGF0ZTogRGF0ZS5ub3coKVxuICAgICAgfSxcbiAgICAgIG1ldGhvZHM6e1xuICAgICAgICBpbml0Q2FtZXJhKCkge1xuICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHtcbiAgICAgICAgICAgIHZpZGVvOiB0cnVlXG4gICAgICAgICAgfSkudGhlbShzdHJlYW0gPT57XG4gICAgICAgICAgICB0aGlzLiRyZWYudmlkZW8uc3JjT2JqZWN0ID0gc3RyZWFtXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1vdW50ZWQgKCkge1xuICAgICAgICB0aGlzLmluaXRDYW1lcmEoKVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbjwvc2NyaXB0PlxuPHN0eWxlIGxhbmc9XCJzYXNzXCI+XG4uY2FtZXJhLWZyYW1lXG4gIGJvcmRlcjogMnB4IHNvbGlkICRncmV5LTEwXG4gIGJvcmRlci1yYWRpdXM6IDEwcHhcbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiYXR0cnMiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZVZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJZSxTQUFRLGFBQUUsRUFBRSxVQUFVLGlCQUFpQixpQkFBaUI7QUFDckUsUUFBTSxRQUFRLE9BQU8sU0FBUyxLQUFLO0FBRW5DLE1BQUksVUFBVSxPQUFPO0FBQ25CLFVBQU0sRUFBRSxPQUFPLE1BQU8sSUFBRyxtQkFBb0I7QUFHN0MsV0FBTyxPQUFPLE9BQU8sRUFBRSxVQUFVLGdCQUFlLENBQUU7QUFFbEQsVUFBTSxNQUFNLE1BQU0sU0FBUyxTQUFPO0FBQ2hDLFVBQUksUUFBUSxNQUFNO0FBQ2hCLGVBQU8sb0JBQW9CLGNBQWMsZ0JBQWlCO0FBQzFELGNBQU0sZ0JBQWdCLEtBQUs7QUFBQSxNQUM1QixPQUNJO0FBQ0gsY0FBTSxjQUFjLEtBQUs7QUFBQSxNQUMxQjtBQUFBLElBQ1AsQ0FBSztBQUVELGNBQVUsTUFBTTtBQUVkLFlBQU0sWUFBWSxRQUFRLE1BQU0sY0FBYyxLQUFLO0FBQUEsSUFDekQsQ0FBSztBQUVELG9CQUFnQixNQUFNO0FBRXBCLFlBQU0sWUFBWSxRQUFRLE1BQU0sZ0JBQWdCLEtBQUs7QUFBQSxJQUMzRCxDQUFLO0FBQUEsRUFDRixXQUNRLGtCQUFrQixNQUFNO0FBQy9CLFlBQVEsTUFBTSwyQ0FBMkM7QUFBQSxFQUMxRDtBQUNIO0FDbENBLE1BQ0UsTUFBTSxzQ0FDTixPQUFPLHNDQUNQLFlBQVksb0VBQ1osTUFBTSx5SEFDTixPQUFPO0FBR0YsTUFBTSxjQUFjO0FBQUEsRUFDekIsTUFBTSxPQUFLLDhCQUE4QixLQUFLLENBQUM7QUFBQSxFQUMvQyxNQUFNLE9BQUssOEJBQThCLEtBQUssQ0FBQztBQUFBLEVBQy9DLFVBQVUsT0FBSyxzQ0FBc0MsS0FBSyxD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
