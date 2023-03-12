import { c as createComponent, f as useSizeProps, g as useSize, Q as QIcon, j as hMergeSlotSafely, h as hSlot, u as useRouterLinkProps, d as useRouterLink, a as hUniqueSlot, i as QSpinner } from "./use-router-link.ba6d1dac.js";
import { c as computed, h, r as ref, m as isKeyCode, s as stopAndPrevent, g as getCurrentInstance, w as watch, a as onBeforeUnmount, T as Transition, P as Plugin, Q as isDate, R as defaultLang, _ as _export_sfc, B as defineComponent, C as openBlock, D as createBlock, E as withCtx, S as createBaseVNode, U as createElementBlock, V as renderList, W as Fragment, F as createVNode, G as createTextVNode, X as toDisplayString } from "./index.40a16a13.js";
import { u as useDarkProps, a as useDark } from "./use-dark.66699697.js";
import { Q as QSeparator } from "./QSeparator.7646bae7.js";
import { Q as QPage } from "./QPage.e2d61dc9.js";
var QAvatar = createComponent({
  name: "QAvatar",
  props: {
    ...useSizeProps,
    fontSize: String,
    color: String,
    textColor: String,
    icon: String,
    square: Boolean,
    rounded: Boolean
  },
  setup(props, { slots }) {
    const sizeStyle = useSize(props);
    const classes = computed(
      () => "q-avatar" + (props.color ? ` bg-${props.color}` : "") + (props.textColor ? ` text-${props.textColor} q-chip--colored` : "") + (props.square === true ? " q-avatar--square" : props.rounded === true ? " rounded-borders" : "")
    );
    const contentStyle = computed(() => props.fontSize ? { fontSize: props.fontSize } : null);
    return () => {
      const icon = props.icon !== void 0 ? [h(QIcon, { name: props.icon })] : void 0;
      return h("div", {
        class: classes.value,
        style: sizeStyle.value
      }, [
        h("div", {
          class: "q-avatar__content row flex-center overflow-hidden",
          style: contentStyle.value
        }, hMergeSlotSafely(slots.default, icon))
      ]);
    };
  }
});
var QItemSection = createComponent({
  name: "QItemSection",
  props: {
    avatar: Boolean,
    thumbnail: Boolean,
    side: Boolean,
    top: Boolean,
    noWrap: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => `q-item__section column q-item__section--${props.avatar === true || props.side === true || props.thumbnail === true ? "side" : "main"}` + (props.top === true ? " q-item__section--top justify-start" : " justify-center") + (props.avatar === true ? " q-item__section--avatar" : "") + (props.thumbnail === true ? " q-item__section--thumbnail" : "") + (props.noWrap === true ? " q-item__section--nowrap" : "")
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
var QItemLabel = createComponent({
  name: "QItemLabel",
  props: {
    overline: Boolean,
    caption: Boolean,
    header: Boolean,
    lines: [Number, String]
  },
  setup(props, { slots }) {
    const parsedLines = computed(() => parseInt(props.lines, 10));
    const classes = computed(
      () => "q-item__label" + (props.overline === true ? " q-item__label--overline text-overline" : "") + (props.caption === true ? " q-item__label--caption text-caption" : "") + (props.header === true ? " q-item__label--header" : "") + (parsedLines.value === 1 ? " ellipsis" : "")
    );
    const style = computed(() => {
      return props.lines !== void 0 && parsedLines.value > 1 ? {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": parsedLines.value
      } : null;
    });
    return () => h("div", {
      style: style.value,
      class: classes.value
    }, hSlot(slots.default));
  }
});
var QItem = createComponent({
  name: "QItem",
  props: {
    ...useDarkProps,
    ...useRouterLinkProps,
    tag: {
      type: String,
      default: "div"
    },
    active: {
      type: Boolean,
      default: null
    },
    clickable: Boolean,
    dense: Boolean,
    insetLevel: Number,
    tabindex: [String, Number],
    focused: Boolean,
    manualFocus: Boolean
  },
  emits: ["click", "keyup"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const { hasLink, linkAttrs, linkClass, linkTag, navigateOnClick } = useRouterLink();
    const rootRef = ref(null);
    const blurTargetRef = ref(null);
    const isActionable = computed(
      () => props.clickable === true || hasLink.value === true || props.tag === "label"
    );
    const isClickable = computed(
      () => props.disable !== true && isActionable.value === true
    );
    const classes = computed(
      () => "q-item q-item-type row no-wrap" + (props.dense === true ? " q-item--dense" : "") + (isDark.value === true ? " q-item--dark" : "") + (hasLink.value === true && props.active === null ? linkClass.value : props.active === true ? ` q-item--active${props.activeClass !== void 0 ? ` ${props.activeClass}` : ""}` : "") + (props.disable === true ? " disabled" : "") + (isClickable.value === true ? " q-item--clickable q-link cursor-pointer " + (props.manualFocus === true ? "q-manual-focusable" : "q-focusable q-hoverable") + (props.focused === true ? " q-manual-focusable--focused" : "") : "")
    );
    const style = computed(() => {
      if (props.insetLevel === void 0) {
        return null;
      }
      const dir = $q.lang.rtl === true ? "Right" : "Left";
      return {
        ["padding" + dir]: 16 + props.insetLevel * 56 + "px"
      };
    });
    function onClick(e) {
      if (isClickable.value === true) {
        if (blurTargetRef.value !== null) {
          if (e.qKeyEvent !== true && document.activeElement === rootRef.value) {
            blurTargetRef.value.focus();
          } else if (document.activeElement === blurTargetRef.value) {
            rootRef.value.focus();
          }
        }
        navigateOnClick(e);
      }
    }
    function onKeyup(e) {
      if (isClickable.value === true && isKeyCode(e, 13) === true) {
        stopAndPrevent(e);
        e.qKeyEvent = true;
        const evt = new MouseEvent("click", e);
        evt.qKeyEvent = true;
        rootRef.value.dispatchEvent(evt);
      }
      emit("keyup", e);
    }
    function getContent() {
      const child = hUniqueSlot(slots.default, []);
      isClickable.value === true && child.unshift(
        h("div", { class: "q-focus-helper", tabindex: -1, ref: blurTargetRef })
      );
      return child;
    }
    return () => {
      const data = {
        ref: rootRef,
        class: classes.value,
        style: style.value,
        role: "listitem",
        onClick,
        onKeyup
      };
      if (isClickable.value === true) {
        data.tabindex = props.tabindex || "0";
        Object.assign(data, linkAttrs.value);
      } else if (isActionable.value === true) {
        data["aria-disabled"] = "true";
      }
      return h(
        linkTag.value,
        data,
        getContent()
      );
    };
  }
});
const useRatioProps = {
  ratio: [String, Number]
};
function useRatio(props, naturalRatio) {
  return computed(() => {
    const ratio = Number(
      props.ratio || (naturalRatio !== void 0 ? naturalRatio.value : void 0)
    );
    return isNaN(ratio) !== true && ratio > 0 ? { paddingBottom: `${100 / ratio}%` } : null;
  });
}
const defaultRatio = 16 / 9;
var QImg = createComponent({
  name: "QImg",
  props: {
    ...useRatioProps,
    src: String,
    srcset: String,
    sizes: String,
    alt: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String,
    draggable: Boolean,
    loading: {
      type: String,
      default: "lazy"
    },
    fetchpriority: {
      type: String,
      default: "auto"
    },
    width: String,
    height: String,
    initialRatio: {
      type: [Number, String],
      default: defaultRatio
    },
    placeholderSrc: String,
    fit: {
      type: String,
      default: "cover"
    },
    position: {
      type: String,
      default: "50% 50%"
    },
    imgClass: String,
    imgStyle: Object,
    noSpinner: Boolean,
    noNativeMenu: Boolean,
    noTransition: Boolean,
    spinnerColor: String,
    spinnerSize: String
  },
  emits: ["load", "error"],
  setup(props, { slots, emit }) {
    const naturalRatio = ref(props.initialRatio);
    const ratioStyle = useRatio(props, naturalRatio);
    let loadTimer = null, isDestroyed = false;
    const images = [
      ref(null),
      ref(getPlaceholderSrc())
    ];
    const position = ref(0);
    const isLoading = ref(false);
    const hasError = ref(false);
    const classes = computed(
      () => `q-img q-img--${props.noNativeMenu === true ? "no-" : ""}menu`
    );
    const style = computed(() => ({
      width: props.width,
      height: props.height
    }));
    const imgClass = computed(
      () => `q-img__image ${props.imgClass !== void 0 ? props.imgClass + " " : ""}q-img__image--with${props.noTransition === true ? "out" : ""}-transition`
    );
    const imgStyle = computed(() => ({
      ...props.imgStyle,
      objectFit: props.fit,
      objectPosition: props.position
    }));
    watch(() => getCurrentSrc(), addImage);
    function getCurrentSrc() {
      return props.src || props.srcset || props.sizes ? {
        src: props.src,
        srcset: props.srcset,
        sizes: props.sizes
      } : null;
    }
    function getPlaceholderSrc() {
      return props.placeholderSrc !== void 0 ? { src: props.placeholderSrc } : null;
    }
    function addImage(imgProps) {
      if (loadTimer !== null) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      hasError.value = false;
      if (imgProps === null) {
        isLoading.value = false;
        images[position.value ^ 1].value = getPlaceholderSrc();
      } else {
        isLoading.value = true;
      }
      images[position.value].value = imgProps;
    }
    function onLoad({ target }) {
      if (isDestroyed === true) {
        return;
      }
      if (loadTimer !== null) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      naturalRatio.value = target.naturalHeight === 0 ? 0.5 : target.naturalWidth / target.naturalHeight;
      waitForCompleteness(target, 1);
    }
    function waitForCompleteness(target, count) {
      if (isDestroyed === true || count === 1e3) {
        return;
      }
      if (target.complete === true) {
        onReady(target);
      } else {
        loadTimer = setTimeout(() => {
          loadTimer = null;
          waitForCompleteness(target, count + 1);
        }, 50);
      }
    }
    function onReady(img) {
      if (isDestroyed === true) {
        return;
      }
      position.value = position.value ^ 1;
      images[position.value].value = null;
      isLoading.value = false;
      hasError.value = false;
      emit("load", img.currentSrc || img.src);
    }
    function onError(err) {
      if (loadTimer !== null) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      isLoading.value = false;
      hasError.value = true;
      images[position.value].value = null;
      images[position.value ^ 1].value = getPlaceholderSrc();
      emit("error", err);
    }
    function getImage(index) {
      const img = images[index].value;
      const data = {
        key: "img_" + index,
        class: imgClass.value,
        style: imgStyle.value,
        crossorigin: props.crossorigin,
        decoding: props.decoding,
        referrerpolicy: props.referrerpolicy,
        height: props.height,
        width: props.width,
        loading: props.loading,
        fetchpriority: props.fetchpriority,
        "aria-hidden": "true",
        draggable: props.draggable,
        ...img
      };
      if (position.value === index) {
        data.class += " q-img__image--waiting";
        Object.assign(data, { onLoad, onError });
      } else {
        data.class += " q-img__image--loaded";
      }
      return h(
        "div",
        { class: "q-img__container absolute-full", key: "img" + index },
        h("img", data)
      );
    }
    function getContent() {
      if (isLoading.value !== true) {
        return h("div", {
          key: "content",
          class: "q-img__content absolute-full q-anchor--skip"
        }, hSlot(slots[hasError.value === true ? "error" : "default"]));
      }
      return h("div", {
        key: "loading",
        class: "q-img__loading absolute-full flex flex-center"
      }, slots.loading !== void 0 ? slots.loading() : props.noSpinner === true ? void 0 : [
        h(QSpinner, {
          color: props.spinnerColor,
          size: props.spinnerSize
        })
      ]);
    }
    {
      {
        addImage(getCurrentSrc());
      }
      onBeforeUnmount(() => {
        isDestroyed = true;
        if (loadTimer !== null) {
          clearTimeout(loadTimer);
          loadTimer = null;
        }
      });
    }
    return () => {
      const content = [];
      if (ratioStyle.value !== null) {
        content.push(
          h("div", { key: "filler", style: ratioStyle.value })
        );
      }
      if (hasError.value !== true) {
        if (images[0].value !== null) {
          content.push(getImage(0));
        }
        if (images[1].value !== null) {
          content.push(getImage(1));
        }
      }
      content.push(
        h(Transition, { name: "q-transition--fade" }, getContent)
      );
      return h("div", {
        class: classes.value,
        style: style.value,
        role: "img",
        "aria-label": props.alt
      }, content);
    };
  }
});
var QCardSection = createComponent({
  name: "QCardSection",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    horizontal: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => `q-card__section q-card__section--${props.horizontal === true ? "horiz row no-wrap" : "vert"}`
    );
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
  }
});
var QCard = createComponent({
  name: "QCard",
  props: {
    ...useDarkProps,
    tag: {
      type: String,
      default: "div"
    },
    square: Boolean,
    flat: Boolean,
    bordered: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const classes = computed(
      () => "q-card" + (isDark.value === true ? " q-card--dark q-dark" : "") + (props.bordered === true ? " q-card--bordered" : "") + (props.square === true ? " q-card--square no-border-radius" : "") + (props.flat === true ? " q-card--flat no-shadow" : "")
    );
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
  }
});
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function pad(v, length = 2, char = "0") {
  if (v === void 0 || v === null) {
    return v;
  }
  const val = "" + v;
  return val.length >= length ? val : new Array(length - val.length + 1).join(char) + val;
}
const breaks = [
  -61,
  9,
  38,
  199,
  426,
  686,
  756,
  818,
  1111,
  1181,
  1210,
  1635,
  2060,
  2097,
  2192,
  2262,
  2324,
  2394,
  2456,
  3178
];
function isLeapJalaaliYear(jy) {
  return jalCalLeap(jy) === 0;
}
function jalaaliMonthLength(jy, jm) {
  if (jm <= 6)
    return 31;
  if (jm <= 11)
    return 30;
  if (isLeapJalaaliYear(jy))
    return 30;
  return 29;
}
function jalCalLeap(jy) {
  const bl = breaks.length;
  let jp = breaks[0], jm, jump, leap, n, i;
  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error("Invalid Jalaali year " + jy);
  }
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) {
      break;
    }
    jp = jm;
  }
  n = jy - jp;
  if (jump - n < 6) {
    n = n - jump + div(jump + 4, 33) * 33;
  }
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) {
    leap = 4;
  }
  return leap;
}
function div(a, b) {
  return ~~(a / b);
}
function mod(a, b) {
  return a - ~~(a / b) * b;
}
const MILLISECONDS_IN_DAY = 864e5, MILLISECONDS_IN_HOUR = 36e5, MILLISECONDS_IN_MINUTE = 6e4, defaultMask = "YYYY-MM-DDTHH:mm:ss.SSSZ", token = /\[((?:[^\]\\]|\\]|\\)*)\]|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g, reverseToken = /(\[[^\]]*\])|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g, regexStore = {};
function getRegexData(mask, dateLocale) {
  const days = "(" + dateLocale.days.join("|") + ")", key = mask + days;
  if (regexStore[key] !== void 0) {
    return regexStore[key];
  }
  const daysShort = "(" + dateLocale.daysShort.join("|") + ")", months = "(" + dateLocale.months.join("|") + ")", monthsShort = "(" + dateLocale.monthsShort.join("|") + ")";
  const map = {};
  let index = 0;
  const regexText = mask.replace(reverseToken, (match) => {
    index++;
    switch (match) {
      case "YY":
        map.YY = index;
        return "(-?\\d{1,2})";
      case "YYYY":
        map.YYYY = index;
        return "(-?\\d{1,4})";
      case "M":
        map.M = index;
        return "(\\d{1,2})";
      case "MM":
        map.M = index;
        return "(\\d{2})";
      case "MMM":
        map.MMM = index;
        return monthsShort;
      case "MMMM":
        map.MMMM = index;
        return months;
      case "D":
        map.D = index;
        return "(\\d{1,2})";
      case "Do":
        map.D = index++;
        return "(\\d{1,2}(st|nd|rd|th))";
      case "DD":
        map.D = index;
        return "(\\d{2})";
      case "H":
        map.H = index;
        return "(\\d{1,2})";
      case "HH":
        map.H = index;
        return "(\\d{2})";
      case "h":
        map.h = index;
        return "(\\d{1,2})";
      case "hh":
        map.h = index;
        return "(\\d{2})";
      case "m":
        map.m = index;
        return "(\\d{1,2})";
      case "mm":
        map.m = index;
        return "(\\d{2})";
      case "s":
        map.s = index;
        return "(\\d{1,2})";
      case "ss":
        map.s = index;
        return "(\\d{2})";
      case "S":
        map.S = index;
        return "(\\d{1})";
      case "SS":
        map.S = index;
        return "(\\d{2})";
      case "SSS":
        map.S = index;
        return "(\\d{3})";
      case "A":
        map.A = index;
        return "(AM|PM)";
      case "a":
        map.a = index;
        return "(am|pm)";
      case "aa":
        map.aa = index;
        return "(a\\.m\\.|p\\.m\\.)";
      case "ddd":
        return daysShort;
      case "dddd":
        return days;
      case "Q":
      case "d":
      case "E":
        return "(\\d{1})";
      case "Qo":
        return "(1st|2nd|3rd|4th)";
      case "DDD":
      case "DDDD":
        return "(\\d{1,3})";
      case "w":
        return "(\\d{1,2})";
      case "ww":
        return "(\\d{2})";
      case "Z":
        map.Z = index;
        return "(Z|[+-]\\d{2}:\\d{2})";
      case "ZZ":
        map.ZZ = index;
        return "(Z|[+-]\\d{2}\\d{2})";
      case "X":
        map.X = index;
        return "(-?\\d+)";
      case "x":
        map.x = index;
        return "(-?\\d{4,})";
      default:
        index--;
        if (match[0] === "[") {
          match = match.substring(1, match.length - 1);
        }
        return match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  });
  const res = { map, regex: new RegExp("^" + regexText) };
  regexStore[key] = res;
  return res;
}
function getDateLocale(paramDateLocale, langProps) {
  return paramDateLocale !== void 0 ? paramDateLocale : langProps !== void 0 ? langProps.date : defaultLang.date;
}
function formatTimezone(offset, delimeter = "") {
  const sign = offset > 0 ? "-" : "+", absOffset = Math.abs(offset), hours = Math.floor(absOffset / 60), minutes = absOffset % 60;
  return sign + pad(hours) + delimeter + pad(minutes);
}
function applyYearMonthDayChange(date2, mod2, sign) {
  let year = date2.getFullYear(), month = date2.getMonth();
  const day = date2.getDate();
  if (mod2.year !== void 0) {
    year += sign * mod2.year;
    delete mod2.year;
  }
  if (mod2.month !== void 0) {
    month += sign * mod2.month;
    delete mod2.month;
  }
  date2.setDate(1);
  date2.setMonth(2);
  date2.setFullYear(year);
  date2.setMonth(month);
  date2.setDate(Math.min(day, daysInMonth(date2)));
  if (mod2.date !== void 0) {
    date2.setDate(date2.getDate() + sign * mod2.date);
    delete mod2.date;
  }
  return date2;
}
function applyYearMonthDay(date2, mod2, middle) {
  const year = mod2.year !== void 0 ? mod2.year : date2[`get${middle}FullYear`](), month = mod2.month !== void 0 ? mod2.month - 1 : date2[`get${middle}Month`](), maxDay = new Date(year, month + 1, 0).getDate(), day = Math.min(maxDay, mod2.date !== void 0 ? mod2.date : date2[`get${middle}Date`]());
  date2[`set${middle}Date`](1);
  date2[`set${middle}Month`](2);
  date2[`set${middle}FullYear`](year);
  date2[`set${middle}Month`](month);
  date2[`set${middle}Date`](day);
  delete mod2.year;
  delete mod2.month;
  delete mod2.date;
  return date2;
}
function getChange(date2, rawMod, sign) {
  const mod2 = normalizeMod(rawMod), d = new Date(date2), t = mod2.year !== void 0 || mod2.month !== void 0 || mod2.date !== void 0 ? applyYearMonthDayChange(d, mod2, sign) : d;
  for (const key in mod2) {
    const op = capitalize(key);
    t[`set${op}`](t[`get${op}`]() + sign * mod2[key]);
  }
  return t;
}
function normalizeMod(mod2) {
  const acc = { ...mod2 };
  if (mod2.years !== void 0) {
    acc.year = mod2.years;
    delete acc.years;
  }
  if (mod2.months !== void 0) {
    acc.month = mod2.months;
    delete acc.months;
  }
  if (mod2.days !== void 0) {
    acc.date = mod2.days;
    delete acc.days;
  }
  if (mod2.day !== void 0) {
    acc.date = mod2.day;
    delete acc.day;
  }
  if (mod2.hour !== void 0) {
    acc.hours = mod2.hour;
    delete acc.hour;
  }
  if (mod2.minute !== void 0) {
    acc.minutes = mod2.minute;
    delete acc.minute;
  }
  if (mod2.second !== void 0) {
    acc.seconds = mod2.second;
    delete acc.second;
  }
  if (mod2.millisecond !== void 0) {
    acc.milliseconds = mod2.millisecond;
    delete acc.millisecond;
  }
  return acc;
}
function adjustDate(date2, rawMod, utc) {
  const mod2 = normalizeMod(rawMod), middle = utc === true ? "UTC" : "", d = new Date(date2), t = mod2.year !== void 0 || mod2.month !== void 0 || mod2.date !== void 0 ? applyYearMonthDay(d, mod2, middle) : d;
  for (const key in mod2) {
    const op = key.charAt(0).toUpperCase() + key.slice(1);
    t[`set${middle}${op}`](mod2[key]);
  }
  return t;
}
function extractDate(str, mask, dateLocale) {
  const d = __splitDate(str, mask, dateLocale);
  const date2 = new Date(
    d.year,
    d.month === null ? null : d.month - 1,
    d.day === null ? 1 : d.day,
    d.hour,
    d.minute,
    d.second,
    d.millisecond
  );
  const tzOffset = date2.getTimezoneOffset();
  return d.timezoneOffset === null || d.timezoneOffset === tzOffset ? date2 : getChange(date2, { minutes: d.timezoneOffset - tzOffset }, 1);
}
function __splitDate(str, mask, dateLocale, calendar, defaultModel) {
  const date2 = {
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    second: null,
    millisecond: null,
    timezoneOffset: null,
    dateHash: null,
    timeHash: null
  };
  defaultModel !== void 0 && Object.assign(date2, defaultModel);
  if (str === void 0 || str === null || str === "" || typeof str !== "string") {
    return date2;
  }
  if (mask === void 0) {
    mask = defaultMask;
  }
  const langOpts = getDateLocale(dateLocale, Plugin.props), months = langOpts.months, monthsShort = langOpts.monthsShort;
  const { regex, map } = getRegexData(mask, langOpts);
  const match = str.match(regex);
  if (match === null) {
    return date2;
  }
  let tzString = "";
  if (map.X !== void 0 || map.x !== void 0) {
    const stamp = parseInt(match[map.X !== void 0 ? map.X : map.x], 10);
    if (isNaN(stamp) === true || stamp < 0) {
      return date2;
    }
    const d = new Date(stamp * (map.X !== void 0 ? 1e3 : 1));
    date2.year = d.getFullYear();
    date2.month = d.getMonth() + 1;
    date2.day = d.getDate();
    date2.hour = d.getHours();
    date2.minute = d.getMinutes();
    date2.second = d.getSeconds();
    date2.millisecond = d.getMilliseconds();
  } else {
    if (map.YYYY !== void 0) {
      date2.year = parseInt(match[map.YYYY], 10);
    } else if (map.YY !== void 0) {
      const y = parseInt(match[map.YY], 10);
      date2.year = y < 0 ? y : 2e3 + y;
    }
    if (map.M !== void 0) {
      date2.month = parseInt(match[map.M], 10);
      if (date2.month < 1 || date2.month > 12) {
        return date2;
      }
    } else if (map.MMM !== void 0) {
      date2.month = monthsShort.indexOf(match[map.MMM]) + 1;
    } else if (map.MMMM !== void 0) {
      date2.month = months.indexOf(match[map.MMMM]) + 1;
    }
    if (map.D !== void 0) {
      date2.day = parseInt(match[map.D], 10);
      if (date2.year === null || date2.month === null || date2.day < 1) {
        return date2;
      }
      const maxDay = calendar !== "persian" ? new Date(date2.year, date2.month, 0).getDate() : jalaaliMonthLength(date2.year, date2.month);
      if (date2.day > maxDay) {
        return date2;
      }
    }
    if (map.H !== void 0) {
      date2.hour = parseInt(match[map.H], 10) % 24;
    } else if (map.h !== void 0) {
      date2.hour = parseInt(match[map.h], 10) % 12;
      if (map.A && match[map.A] === "PM" || map.a && match[map.a] === "pm" || map.aa && match[map.aa] === "p.m.") {
        date2.hour += 12;
      }
      date2.hour = date2.hour % 24;
    }
    if (map.m !== void 0) {
      date2.minute = parseInt(match[map.m], 10) % 60;
    }
    if (map.s !== void 0) {
      date2.second = parseInt(match[map.s], 10) % 60;
    }
    if (map.S !== void 0) {
      date2.millisecond = parseInt(match[map.S], 10) * 10 ** (3 - match[map.S].length);
    }
    if (map.Z !== void 0 || map.ZZ !== void 0) {
      tzString = map.Z !== void 0 ? match[map.Z].replace(":", "") : match[map.ZZ];
      date2.timezoneOffset = (tzString[0] === "+" ? -1 : 1) * (60 * tzString.slice(1, 3) + 1 * tzString.slice(3, 5));
    }
  }
  date2.dateHash = pad(date2.year, 6) + "/" + pad(date2.month) + "/" + pad(date2.day);
  date2.timeHash = pad(date2.hour) + ":" + pad(date2.minute) + ":" + pad(date2.second) + tzString;
  return date2;
}
function isValid(date2) {
  return typeof date2 === "number" ? true : isNaN(Date.parse(date2)) === false;
}
function buildDate(mod2, utc) {
  return adjustDate(new Date(), mod2, utc);
}
function getDayOfWeek(date2) {
  const dow = new Date(date2).getDay();
  return dow === 0 ? 7 : dow;
}
function getWeekOfYear(date2) {
  const thursday = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  thursday.setDate(thursday.getDate() - (thursday.getDay() + 6) % 7 + 3);
  const firstThursday = new Date(thursday.getFullYear(), 0, 4);
  firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
  const ds = thursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  thursday.setHours(thursday.getHours() - ds);
  const weekDiff = (thursday - firstThursday) / (MILLISECONDS_IN_DAY * 7);
  return 1 + Math.floor(weekDiff);
}
function getDayIdentifier(date2) {
  return date2.getFullYear() * 1e4 + date2.getMonth() * 100 + date2.getDate();
}
function getDateIdentifier(date2, onlyDate) {
  const d = new Date(date2);
  return onlyDate === true ? getDayIdentifier(d) : d.getTime();
}
function isBetweenDates(date2, from, to, opts = {}) {
  const d1 = getDateIdentifier(from, opts.onlyDate), d2 = getDateIdentifier(to, opts.onlyDate), cur = getDateIdentifier(date2, opts.onlyDate);
  return (cur > d1 || opts.inclusiveFrom === true && cur === d1) && (cur < d2 || opts.inclusiveTo === true && cur === d2);
}
function addToDate(date2, mod2) {
  return getChange(date2, mod2, 1);
}
function subtractFromDate(date2, mod2) {
  return getChange(date2, mod2, -1);
}
function startOfDate(date2, unit, utc) {
  const t = new Date(date2), prefix = `set${utc === true ? "UTC" : ""}`;
  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](0);
    case "month":
    case "months":
      t[`${prefix}Date`](1);
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](0);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](0);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](0);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](0);
  }
  return t;
}
function endOfDate(date2, unit, utc) {
  const t = new Date(date2), prefix = `set${utc === true ? "UTC" : ""}`;
  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](11);
    case "month":
    case "months":
      t[`${prefix}Date`](daysInMonth(t));
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](23);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](59);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](59);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](999);
  }
  return t;
}
function getMaxDate(date2) {
  let t = new Date(date2);
  Array.prototype.slice.call(arguments, 1).forEach((d) => {
    t = Math.max(t, new Date(d));
  });
  return t;
}
function getMinDate(date2) {
  let t = new Date(date2);
  Array.prototype.slice.call(arguments, 1).forEach((d) => {
    t = Math.min(t, new Date(d));
  });
  return t;
}
function getDiff(t, sub, interval) {
  return (t.getTime() - t.getTimezoneOffset() * MILLISECONDS_IN_MINUTE - (sub.getTime() - sub.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)) / interval;
}
function getDateDiff(date2, subtract, unit = "days") {
  const t = new Date(date2), sub = new Date(subtract);
  switch (unit) {
    case "years":
    case "year":
      return t.getFullYear() - sub.getFullYear();
    case "months":
    case "month":
      return (t.getFullYear() - sub.getFullYear()) * 12 + t.getMonth() - sub.getMonth();
    case "days":
    case "day":
    case "date":
      return getDiff(startOfDate(t, "day"), startOfDate(sub, "day"), MILLISECONDS_IN_DAY);
    case "hours":
    case "hour":
      return getDiff(startOfDate(t, "hour"), startOfDate(sub, "hour"), MILLISECONDS_IN_HOUR);
    case "minutes":
    case "minute":
      return getDiff(startOfDate(t, "minute"), startOfDate(sub, "minute"), MILLISECONDS_IN_MINUTE);
    case "seconds":
    case "second":
      return getDiff(startOfDate(t, "second"), startOfDate(sub, "second"), 1e3);
  }
}
function getDayOfYear(date2) {
  return getDateDiff(date2, startOfDate(date2, "year"), "days") + 1;
}
function inferDateFormat(date2) {
  return isDate(date2) === true ? "date" : typeof date2 === "number" ? "number" : "string";
}
function getDateBetween(date2, min, max) {
  const t = new Date(date2);
  if (min) {
    const low = new Date(min);
    if (t < low) {
      return low;
    }
  }
  if (max) {
    const high = new Date(max);
    if (t > high) {
      return high;
    }
  }
  return t;
}
function isSameDate(date2, date22, unit) {
  const t = new Date(date2), d = new Date(date22);
  if (unit === void 0) {
    return t.getTime() === d.getTime();
  }
  switch (unit) {
    case "second":
    case "seconds":
      if (t.getSeconds() !== d.getSeconds()) {
        return false;
      }
    case "minute":
    case "minutes":
      if (t.getMinutes() !== d.getMinutes()) {
        return false;
      }
    case "hour":
    case "hours":
      if (t.getHours() !== d.getHours()) {
        return false;
      }
    case "day":
    case "days":
    case "date":
      if (t.getDate() !== d.getDate()) {
        return false;
      }
    case "month":
    case "months":
      if (t.getMonth() !== d.getMonth()) {
        return false;
      }
    case "year":
    case "years":
      if (t.getFullYear() !== d.getFullYear()) {
        return false;
      }
      break;
    default:
      throw new Error(`date isSameDate unknown unit ${unit}`);
  }
  return true;
}
function daysInMonth(date2) {
  return new Date(date2.getFullYear(), date2.getMonth() + 1, 0).getDate();
}
function getOrdinal(n) {
  if (n >= 11 && n <= 13) {
    return `${n}th`;
  }
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
  }
  return `${n}th`;
}
const formatter = {
  YY(date2, dateLocale, forcedYear) {
    const y = this.YYYY(date2, dateLocale, forcedYear) % 100;
    return y >= 0 ? pad(y) : "-" + pad(Math.abs(y));
  },
  YYYY(date2, _dateLocale, forcedYear) {
    return forcedYear !== void 0 && forcedYear !== null ? forcedYear : date2.getFullYear();
  },
  M(date2) {
    return date2.getMonth() + 1;
  },
  MM(date2) {
    return pad(date2.getMonth() + 1);
  },
  MMM(date2, dateLocale) {
    return dateLocale.monthsShort[date2.getMonth()];
  },
  MMMM(date2, dateLocale) {
    return dateLocale.months[date2.getMonth()];
  },
  Q(date2) {
    return Math.ceil((date2.getMonth() + 1) / 3);
  },
  Qo(date2) {
    return getOrdinal(this.Q(date2));
  },
  D(date2) {
    return date2.getDate();
  },
  Do(date2) {
    return getOrdinal(date2.getDate());
  },
  DD(date2) {
    return pad(date2.getDate());
  },
  DDD(date2) {
    return getDayOfYear(date2);
  },
  DDDD(date2) {
    return pad(getDayOfYear(date2), 3);
  },
  d(date2) {
    return date2.getDay();
  },
  dd(date2, dateLocale) {
    return this.dddd(date2, dateLocale).slice(0, 2);
  },
  ddd(date2, dateLocale) {
    return dateLocale.daysShort[date2.getDay()];
  },
  dddd(date2, dateLocale) {
    return dateLocale.days[date2.getDay()];
  },
  E(date2) {
    return date2.getDay() || 7;
  },
  w(date2) {
    return getWeekOfYear(date2);
  },
  ww(date2) {
    return pad(getWeekOfYear(date2));
  },
  H(date2) {
    return date2.getHours();
  },
  HH(date2) {
    return pad(date2.getHours());
  },
  h(date2) {
    const hours = date2.getHours();
    return hours === 0 ? 12 : hours > 12 ? hours % 12 : hours;
  },
  hh(date2) {
    return pad(this.h(date2));
  },
  m(date2) {
    return date2.getMinutes();
  },
  mm(date2) {
    return pad(date2.getMinutes());
  },
  s(date2) {
    return date2.getSeconds();
  },
  ss(date2) {
    return pad(date2.getSeconds());
  },
  S(date2) {
    return Math.floor(date2.getMilliseconds() / 100);
  },
  SS(date2) {
    return pad(Math.floor(date2.getMilliseconds() / 10));
  },
  SSS(date2) {
    return pad(date2.getMilliseconds(), 3);
  },
  A(date2) {
    return this.H(date2) < 12 ? "AM" : "PM";
  },
  a(date2) {
    return this.H(date2) < 12 ? "am" : "pm";
  },
  aa(date2) {
    return this.H(date2) < 12 ? "a.m." : "p.m.";
  },
  Z(date2, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date2.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset, ":");
  },
  ZZ(date2, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date2.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset);
  },
  X(date2) {
    return Math.floor(date2.getTime() / 1e3);
  },
  x(date2) {
    return date2.getTime();
  }
};
function formatDate(val, mask, dateLocale, __forcedYear, __forcedTimezoneOffset) {
  if (val !== 0 && !val || val === Infinity || val === -Infinity) {
    return;
  }
  const date2 = new Date(val);
  if (isNaN(date2)) {
    return;
  }
  if (mask === void 0) {
    mask = defaultMask;
  }
  const locale = getDateLocale(dateLocale, Plugin.props);
  return mask.replace(
    token,
    (match, text) => match in formatter ? formatter[match](date2, locale, __forcedYear, __forcedTimezoneOffset) : text === void 0 ? match : text.split("\\]").join("]")
  );
}
function clone(date2) {
  return isDate(date2) === true ? new Date(date2.getTime()) : date2;
}
var date = {
  isValid,
  extractDate,
  buildDate,
  getDayOfWeek,
  getWeekOfYear,
  isBetweenDates,
  addToDate,
  subtractFromDate,
  adjustDate,
  startOfDate,
  endOfDate,
  getMaxDate,
  getMinDate,
  getDateDiff,
  getDayOfYear,
  inferDateFormat,
  getDateBetween,
  isSameDate,
  daysInMonth,
  formatDate,
  clone
};
var PageHome_vue_vue_type_style_index_0_lang = "";
const _sfc_main = defineComponent({
  name: "PageHome",
  data() {
    return {
      posts: [
        {
          id: 1,
          caption: "Ponte Golden Gate",
          date: 1591776655584,
          location: "Beira, Mo\xE7ambique",
          imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          id: 2,
          caption: "Ponte Golden Gate",
          date: 1591776655584,
          location: "Beira, Mo\xE7ambique",
          imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          id: 3,
          caption: "Ponte Golden Gate",
          date: 1591776655584,
          location: "Beira, Mo\xE7ambique",
          imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          id: 4,
          caption: "Ponte Golden Gate",
          date: 1591776655584,
          location: "Beira, Mo\xE7ambique",
          imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg"
        }
      ]
    };
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, "YYYY-MM-DDTHH:mm:ss.SSSZ");
    }
  }
});
const _hoisted_1 = { class: "row q-col-gutter-lg" };
const _hoisted_2 = { class: "col-12 col-md-8" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/boy-avatar.png" }, null, -1);
const _hoisted_4 = { class: "text-caption text-grey" };
const _hoisted_5 = { class: "col-4 large-screen-only" };
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/boy-avatar.png" }, null, -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "constrain q-pa-md" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.posts, (post) => {
            return openBlock(), createBlock(QCard, {
              key: post.id,
              class: "card-post q-mb-md",
              flat: "",
              bordered: ""
            }, {
              default: withCtx(() => [
                createVNode(QItem, null, {
                  default: withCtx(() => [
                    createVNode(QItemSection, { avatar: "" }, {
                      default: withCtx(() => [
                        createVNode(QAvatar, null, {
                          default: withCtx(() => [
                            _hoisted_3
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QItemSection, null, {
                      default: withCtx(() => [
                        createVNode(QItemLabel, { class: "text-bold" }, {
                          default: withCtx(() => [
                            createTextVNode("anselmonteiro")
                          ]),
                          _: 1
                        }),
                        createVNode(QItemLabel, { caption: "" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(post.location), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                createVNode(QSeparator),
                createVNode(QImg, {
                  src: post.imageUrl
                }, null, 8, ["src"]),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", null, toDisplayString(post.caption), 1),
                    createBaseVNode("div", _hoisted_4, toDisplayString(post.date), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024);
          }), 128))
        ]),
        createBaseVNode("div", _hoisted_5, [
          createVNode(QItem, { class: "fixed" }, {
            default: withCtx(() => [
              createVNode(QItemSection, { avatar: "" }, {
                default: withCtx(() => [
                  createVNode(QAvatar, { size: "48px" }, {
                    default: withCtx(() => [
                      _hoisted_6
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(QItemSection, null, {
                default: withCtx(() => [
                  createVNode(QItemLabel, { class: "text-bold" }, {
                    default: withCtx(() => [
                      createTextVNode("anselmonteiro")
                    ]),
                    _: 1
                  }),
                  createVNode(QItemLabel, { caption: "" }, {
                    default: withCtx(() => [
                      createTextVNode(" anselmonteiro ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
var PageHome = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "PageHome.vue"]]);
export { PageHome as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZUhvbWUuNjYwODI3N2IuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvYXZhdGFyL1FBdmF0YXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2l0ZW0vUUl0ZW1TZWN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pdGVtL1FJdGVtTGFiZWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2l0ZW0vUUl0ZW0uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1yYXRpby5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaW1nL1FJbWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NhcmQvUUNhcmRTZWN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jYXJkL1FDYXJkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvZm9ybWF0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9kYXRlLXBlcnNpYW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9kYXRlLmpzIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL1BhZ2VIb21lLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5cbmltcG9ydCB1c2VTaXplLCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNpemUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdFNhZmVseSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUF2YXRhcicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VTaXplUHJvcHMsXG5cbiAgICBmb250U2l6ZTogU3RyaW5nLFxuXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIGljb246IFN0cmluZyxcbiAgICBzcXVhcmU6IEJvb2xlYW4sXG4gICAgcm91bmRlZDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3Qgc2l6ZVN0eWxlID0gdXNlU2l6ZShwcm9wcylcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtYXZhdGFyJ1xuICAgICAgKyAocHJvcHMuY29sb3IgPyBgIGJnLSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICArIChwcm9wcy50ZXh0Q29sb3IgPyBgIHRleHQtJHsgcHJvcHMudGV4dENvbG9yIH0gcS1jaGlwLS1jb2xvcmVkYCA6ICcnKVxuICAgICAgKyAoXG4gICAgICAgIHByb3BzLnNxdWFyZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBxLWF2YXRhci0tc3F1YXJlJ1xuICAgICAgICAgIDogKHByb3BzLnJvdW5kZWQgPT09IHRydWUgPyAnIHJvdW5kZWQtYm9yZGVycycgOiAnJylcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBjb250ZW50U3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5mb250U2l6ZVxuICAgICAgICA/IHsgZm9udFNpemU6IHByb3BzLmZvbnRTaXplIH1cbiAgICAgICAgOiBudWxsXG4gICAgKSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBpY29uID0gcHJvcHMuaWNvbiAhPT0gdm9pZCAwXG4gICAgICAgID8gWyBoKFFJY29uLCB7IG5hbWU6IHByb3BzLmljb24gfSkgXVxuICAgICAgICA6IHZvaWQgMFxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHNpemVTdHlsZS52YWx1ZVxuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWF2YXRhcl9fY29udGVudCByb3cgZmxleC1jZW50ZXIgb3ZlcmZsb3ctaGlkZGVuJyxcbiAgICAgICAgICBzdHlsZTogY29udGVudFN0eWxlLnZhbHVlXG4gICAgICAgIH0sIGhNZXJnZVNsb3RTYWZlbHkoc2xvdHMuZGVmYXVsdCwgaWNvbikpXG4gICAgICBdKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSXRlbVNlY3Rpb24nLFxuXG4gIHByb3BzOiB7XG4gICAgYXZhdGFyOiBCb29sZWFuLFxuICAgIHRodW1ibmFpbDogQm9vbGVhbixcbiAgICBzaWRlOiBCb29sZWFuLFxuICAgIHRvcDogQm9vbGVhbixcbiAgICBub1dyYXA6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtaXRlbV9fc2VjdGlvbiBjb2x1bW4nXG4gICAgICArIGAgcS1pdGVtX19zZWN0aW9uLS0keyBwcm9wcy5hdmF0YXIgPT09IHRydWUgfHwgcHJvcHMuc2lkZSA9PT0gdHJ1ZSB8fCBwcm9wcy50aHVtYm5haWwgPT09IHRydWUgPyAnc2lkZScgOiAnbWFpbicgfWBcbiAgICAgICsgKHByb3BzLnRvcCA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19zZWN0aW9uLS10b3AganVzdGlmeS1zdGFydCcgOiAnIGp1c3RpZnktY2VudGVyJylcbiAgICAgICsgKHByb3BzLmF2YXRhciA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19zZWN0aW9uLS1hdmF0YXInIDogJycpXG4gICAgICArIChwcm9wcy50aHVtYm5haWwgPT09IHRydWUgPyAnIHEtaXRlbV9fc2VjdGlvbi0tdGh1bWJuYWlsJyA6ICcnKVxuICAgICAgKyAocHJvcHMubm9XcmFwID09PSB0cnVlID8gJyBxLWl0ZW1fX3NlY3Rpb24tLW5vd3JhcCcgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSXRlbUxhYmVsJyxcblxuICBwcm9wczoge1xuICAgIG92ZXJsaW5lOiBCb29sZWFuLFxuICAgIGNhcHRpb246IEJvb2xlYW4sXG4gICAgaGVhZGVyOiBCb29sZWFuLFxuICAgIGxpbmVzOiBbIE51bWJlciwgU3RyaW5nIF1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHBhcnNlZExpbmVzID0gY29tcHV0ZWQoKCkgPT4gcGFyc2VJbnQocHJvcHMubGluZXMsIDEwKSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtaXRlbV9fbGFiZWwnXG4gICAgICArIChwcm9wcy5vdmVybGluZSA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19sYWJlbC0tb3ZlcmxpbmUgdGV4dC1vdmVybGluZScgOiAnJylcbiAgICAgICsgKHByb3BzLmNhcHRpb24gPT09IHRydWUgPyAnIHEtaXRlbV9fbGFiZWwtLWNhcHRpb24gdGV4dC1jYXB0aW9uJyA6ICcnKVxuICAgICAgKyAocHJvcHMuaGVhZGVyID09PSB0cnVlID8gJyBxLWl0ZW1fX2xhYmVsLS1oZWFkZXInIDogJycpXG4gICAgICArIChwYXJzZWRMaW5lcy52YWx1ZSA9PT0gMSA/ICcgZWxsaXBzaXMnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gcHJvcHMubGluZXMgIT09IHZvaWQgMCAmJiBwYXJzZWRMaW5lcy52YWx1ZSA+IDFcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICBkaXNwbGF5OiAnLXdlYmtpdC1ib3gnLFxuICAgICAgICAgICAgJy13ZWJraXQtYm94LW9yaWVudCc6ICd2ZXJ0aWNhbCcsXG4gICAgICAgICAgICAnLXdlYmtpdC1saW5lLWNsYW1wJzogcGFyc2VkTGluZXMudmFsdWVcbiAgICAgICAgICB9XG4gICAgICAgIDogbnVsbFxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2Jywge1xuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWVcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB1c2VSb3V0ZXJMaW5rLCB7IHVzZVJvdXRlckxpbmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJvdXRlci1saW5rLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhVbmlxdWVTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSXRlbScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG4gICAgLi4udXNlUm91dGVyTGlua1Byb3BzLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH0sXG5cbiAgICBhY3RpdmU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcblxuICAgIGNsaWNrYWJsZTogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICBpbnNldExldmVsOiBOdW1iZXIsXG5cbiAgICB0YWJpbmRleDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgZm9jdXNlZDogQm9vbGVhbixcbiAgICBtYW51YWxGb2N1czogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbICdjbGljaycsICdrZXl1cCcgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHsgaGFzTGluaywgbGlua0F0dHJzLCBsaW5rQ2xhc3MsIGxpbmtUYWcsIG5hdmlnYXRlT25DbGljayB9ID0gdXNlUm91dGVyTGluaygpXG5cbiAgICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgYmx1clRhcmdldFJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgaXNBY3Rpb25hYmxlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmNsaWNrYWJsZSA9PT0gdHJ1ZVxuICAgICAgICB8fCBoYXNMaW5rLnZhbHVlID09PSB0cnVlXG4gICAgICAgIHx8IHByb3BzLnRhZyA9PT0gJ2xhYmVsJ1xuICAgIClcblxuICAgIGNvbnN0IGlzQ2xpY2thYmxlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgaXNBY3Rpb25hYmxlLnZhbHVlID09PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1pdGVtIHEtaXRlbS10eXBlIHJvdyBuby13cmFwJ1xuICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtaXRlbS0tZGVuc2UnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtaXRlbS0tZGFyaycgOiAnJylcbiAgICAgICsgKFxuICAgICAgICBoYXNMaW5rLnZhbHVlID09PSB0cnVlICYmIHByb3BzLmFjdGl2ZSA9PT0gbnVsbFxuICAgICAgICAgID8gbGlua0NsYXNzLnZhbHVlXG4gICAgICAgICAgOiAoXG4gICAgICAgICAgICAgIHByb3BzLmFjdGl2ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgID8gYCBxLWl0ZW0tLWFjdGl2ZSR7IHByb3BzLmFjdGl2ZUNsYXNzICE9PSB2b2lkIDAgPyBgICR7IHByb3BzLmFjdGl2ZUNsYXNzIH1gIDogJycgfWBcbiAgICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgICApXG4gICAgICApXG4gICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICAgICsgKFxuICAgICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBxLWl0ZW0tLWNsaWNrYWJsZSBxLWxpbmsgY3Vyc29yLXBvaW50ZXIgJ1xuICAgICAgICAgICAgKyAocHJvcHMubWFudWFsRm9jdXMgPT09IHRydWUgPyAncS1tYW51YWwtZm9jdXNhYmxlJyA6ICdxLWZvY3VzYWJsZSBxLWhvdmVyYWJsZScpXG4gICAgICAgICAgICArIChwcm9wcy5mb2N1c2VkID09PSB0cnVlID8gJyBxLW1hbnVhbC1mb2N1c2FibGUtLWZvY3VzZWQnIDogJycpXG4gICAgICAgICAgOiAnJ1xuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLmluc2V0TGV2ZWwgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXIgPSAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdSaWdodCcgOiAnTGVmdCdcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFsgJ3BhZGRpbmcnICsgZGlyIF06ICgxNiArIHByb3BzLmluc2V0TGV2ZWwgKiA1NikgKyAncHgnXG4gICAgICB9XG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2sgKGUpIHtcbiAgICAgIGlmIChpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoYmx1clRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmIChlLnFLZXlFdmVudCAhPT0gdHJ1ZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgICAgICBibHVyVGFyZ2V0UmVmLnZhbHVlLmZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gYmx1clRhcmdldFJlZi52YWx1ZSkge1xuICAgICAgICAgICAgcm9vdFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmF2aWdhdGVPbkNsaWNrKGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgICAgaWYgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlICYmIGlzS2V5Q29kZShlLCAxMykgPT09IHRydWUpIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcblxuICAgICAgICAvLyBmb3IgcmlwcGxlXG4gICAgICAgIGUucUtleUV2ZW50ID0gdHJ1ZVxuXG4gICAgICAgIC8vIGZvciBjbGljayB0cmlnZ2VyXG4gICAgICAgIGNvbnN0IGV2dCA9IG5ldyBNb3VzZUV2ZW50KCdjbGljaycsIGUpXG4gICAgICAgIGV2dC5xS2V5RXZlbnQgPSB0cnVlXG4gICAgICAgIHJvb3RSZWYudmFsdWUuZGlzcGF0Y2hFdmVudChldnQpXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ2tleXVwJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gaFVuaXF1ZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW10pXG5cbiAgICAgIGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlICYmIGNoaWxkLnVuc2hpZnQoXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLWZvY3VzLWhlbHBlcicsIHRhYmluZGV4OiAtMSwgcmVmOiBibHVyVGFyZ2V0UmVmIH0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICByZWY6IHJvb3RSZWYsXG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICAgIHJvbGU6ICdsaXN0aXRlbScsXG4gICAgICAgIG9uQ2xpY2ssXG4gICAgICAgIG9uS2V5dXBcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGRhdGEudGFiaW5kZXggPSBwcm9wcy50YWJpbmRleCB8fCAnMCdcbiAgICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCBsaW5rQXR0cnMudmFsdWUpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0FjdGlvbmFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgZGF0YVsgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoXG4gICAgICAgIGxpbmtUYWcudmFsdWUsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdldENvbnRlbnQoKVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlUmF0aW9Qcm9wcyA9IHtcbiAgcmF0aW86IFsgU3RyaW5nLCBOdW1iZXIgXVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIG5hdHVyYWxSYXRpbykge1xuICAvLyByZXR1cm4gcmF0aW9TdHlsZVxuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHJhdGlvID0gTnVtYmVyKFxuICAgICAgcHJvcHMucmF0aW8gfHwgKG5hdHVyYWxSYXRpbyAhPT0gdm9pZCAwID8gbmF0dXJhbFJhdGlvLnZhbHVlIDogdm9pZCAwKVxuICAgIClcblxuICAgIHJldHVybiBpc05hTihyYXRpbykgIT09IHRydWUgJiYgcmF0aW8gPiAwXG4gICAgICA/IHsgcGFkZGluZ0JvdHRvbTogYCR7IDEwMCAvIHJhdGlvIH0lYCB9XG4gICAgICA6IG51bGxcbiAgfSlcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgVHJhbnNpdGlvbiB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uL3NwaW5uZXIvUVNwaW5uZXIuanMnXG5cbmltcG9ydCB1c2VSYXRpbywgeyB1c2VSYXRpb1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcmF0aW8uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3QgZGVmYXVsdFJhdGlvID0gMTYgLyA5XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSW1nJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVJhdGlvUHJvcHMsXG5cbiAgICBzcmM6IFN0cmluZyxcbiAgICBzcmNzZXQ6IFN0cmluZyxcbiAgICBzaXplczogU3RyaW5nLFxuXG4gICAgYWx0OiBTdHJpbmcsXG4gICAgY3Jvc3NvcmlnaW46IFN0cmluZyxcbiAgICBkZWNvZGluZzogU3RyaW5nLFxuICAgIHJlZmVycmVycG9saWN5OiBTdHJpbmcsXG5cbiAgICBkcmFnZ2FibGU6IEJvb2xlYW4sXG5cbiAgICBsb2FkaW5nOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnbGF6eSdcbiAgICB9LFxuICAgIGZldGNocHJpb3JpdHk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdhdXRvJ1xuICAgIH0sXG4gICAgd2lkdGg6IFN0cmluZyxcbiAgICBoZWlnaHQ6IFN0cmluZyxcbiAgICBpbml0aWFsUmF0aW86IHtcbiAgICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICAgIGRlZmF1bHQ6IGRlZmF1bHRSYXRpb1xuICAgIH0sXG5cbiAgICBwbGFjZWhvbGRlclNyYzogU3RyaW5nLFxuXG4gICAgZml0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnY292ZXInXG4gICAgfSxcbiAgICBwb3NpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJzUwJSA1MCUnXG4gICAgfSxcblxuICAgIGltZ0NsYXNzOiBTdHJpbmcsXG4gICAgaW1nU3R5bGU6IE9iamVjdCxcblxuICAgIG5vU3Bpbm5lcjogQm9vbGVhbixcbiAgICBub05hdGl2ZU1lbnU6IEJvb2xlYW4sXG4gICAgbm9UcmFuc2l0aW9uOiBCb29sZWFuLFxuXG4gICAgc3Bpbm5lckNvbG9yOiBTdHJpbmcsXG4gICAgc3Bpbm5lclNpemU6IFN0cmluZ1xuICB9LFxuXG4gIGVtaXRzOiBbICdsb2FkJywgJ2Vycm9yJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgbmF0dXJhbFJhdGlvID0gcmVmKHByb3BzLmluaXRpYWxSYXRpbylcbiAgICBjb25zdCByYXRpb1N0eWxlID0gdXNlUmF0aW8ocHJvcHMsIG5hdHVyYWxSYXRpbylcblxuICAgIGxldCBsb2FkVGltZXIgPSBudWxsLCBpc0Rlc3Ryb3llZCA9IGZhbHNlXG5cbiAgICBjb25zdCBpbWFnZXMgPSBbXG4gICAgICByZWYobnVsbCksXG4gICAgICByZWYoZ2V0UGxhY2Vob2xkZXJTcmMoKSlcbiAgICBdXG5cbiAgICBjb25zdCBwb3NpdGlvbiA9IHJlZigwKVxuXG4gICAgY29uc3QgaXNMb2FkaW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGhhc0Vycm9yID0gcmVmKGZhbHNlKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1pbWcgcS1pbWctLSR7IHByb3BzLm5vTmF0aXZlTWVudSA9PT0gdHJ1ZSA/ICduby0nIDogJycgfW1lbnVgXG4gICAgKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgd2lkdGg6IHByb3BzLndpZHRoLFxuICAgICAgaGVpZ2h0OiBwcm9wcy5oZWlnaHRcbiAgICB9KSlcblxuICAgIGNvbnN0IGltZ0NsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLWltZ19faW1hZ2UgJHsgcHJvcHMuaW1nQ2xhc3MgIT09IHZvaWQgMCA/IHByb3BzLmltZ0NsYXNzICsgJyAnIDogJycgfWBcbiAgICAgICsgYHEtaW1nX19pbWFnZS0td2l0aCR7IHByb3BzLm5vVHJhbnNpdGlvbiA9PT0gdHJ1ZSA/ICdvdXQnIDogJycgfS10cmFuc2l0aW9uYFxuICAgIClcblxuICAgIGNvbnN0IGltZ1N0eWxlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIC4uLnByb3BzLmltZ1N0eWxlLFxuICAgICAgb2JqZWN0Rml0OiBwcm9wcy5maXQsXG4gICAgICBvYmplY3RQb3NpdGlvbjogcHJvcHMucG9zaXRpb25cbiAgICB9KSlcblxuICAgIHdhdGNoKCgpID0+IGdldEN1cnJlbnRTcmMoKSwgYWRkSW1hZ2UpXG5cbiAgICBmdW5jdGlvbiBnZXRDdXJyZW50U3JjICgpIHtcbiAgICAgIHJldHVybiBwcm9wcy5zcmMgfHwgcHJvcHMuc3Jjc2V0IHx8IHByb3BzLnNpemVzXG4gICAgICAgID8ge1xuICAgICAgICAgICAgc3JjOiBwcm9wcy5zcmMsXG4gICAgICAgICAgICBzcmNzZXQ6IHByb3BzLnNyY3NldCxcbiAgICAgICAgICAgIHNpemVzOiBwcm9wcy5zaXplc1xuICAgICAgICAgIH1cbiAgICAgICAgOiBudWxsXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UGxhY2Vob2xkZXJTcmMgKCkge1xuICAgICAgcmV0dXJuIHByb3BzLnBsYWNlaG9sZGVyU3JjICE9PSB2b2lkIDBcbiAgICAgICAgPyB7IHNyYzogcHJvcHMucGxhY2Vob2xkZXJTcmMgfVxuICAgICAgICA6IG51bGxcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRJbWFnZSAoaW1nUHJvcHMpIHtcbiAgICAgIGlmIChsb2FkVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRUaW1lcilcbiAgICAgICAgbG9hZFRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBoYXNFcnJvci52YWx1ZSA9IGZhbHNlXG5cbiAgICAgIGlmIChpbWdQcm9wcyA9PT0gbnVsbCkge1xuICAgICAgICBpc0xvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICBpbWFnZXNbIHBvc2l0aW9uLnZhbHVlIF4gMSBdLnZhbHVlID0gZ2V0UGxhY2Vob2xkZXJTcmMoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlzTG9hZGluZy52YWx1ZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaW1hZ2VzWyBwb3NpdGlvbi52YWx1ZSBdLnZhbHVlID0gaW1nUHJvcHNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkxvYWQgKHsgdGFyZ2V0IH0pIHtcbiAgICAgIGlmIChpc0Rlc3Ryb3llZCA9PT0gdHJ1ZSkgeyByZXR1cm4gfVxuXG4gICAgICBpZiAobG9hZFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChsb2FkVGltZXIpXG4gICAgICAgIGxvYWRUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgbmF0dXJhbFJhdGlvLnZhbHVlID0gdGFyZ2V0Lm5hdHVyYWxIZWlnaHQgPT09IDBcbiAgICAgICAgPyAwLjVcbiAgICAgICAgOiB0YXJnZXQubmF0dXJhbFdpZHRoIC8gdGFyZ2V0Lm5hdHVyYWxIZWlnaHRcblxuICAgICAgd2FpdEZvckNvbXBsZXRlbmVzcyh0YXJnZXQsIDEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2FpdEZvckNvbXBsZXRlbmVzcyAodGFyZ2V0LCBjb3VudCkge1xuICAgICAgLy8gcHJvdGVjdCBhZ2FpbnN0IHJ1bm5pbmcgZm9yZXZlclxuICAgICAgaWYgKGlzRGVzdHJveWVkID09PSB0cnVlIHx8IGNvdW50ID09PSAxMDAwKSB7IHJldHVybiB9XG5cbiAgICAgIGlmICh0YXJnZXQuY29tcGxldGUgPT09IHRydWUpIHtcbiAgICAgICAgb25SZWFkeSh0YXJnZXQpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbG9hZFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgbG9hZFRpbWVyID0gbnVsbFxuICAgICAgICAgIHdhaXRGb3JDb21wbGV0ZW5lc3ModGFyZ2V0LCBjb3VudCArIDEpXG4gICAgICAgIH0sIDUwKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVhZHkgKGltZykge1xuICAgICAgaWYgKGlzRGVzdHJveWVkID09PSB0cnVlKSB7IHJldHVybiB9XG5cbiAgICAgIHBvc2l0aW9uLnZhbHVlID0gcG9zaXRpb24udmFsdWUgXiAxXG4gICAgICBpbWFnZXNbIHBvc2l0aW9uLnZhbHVlIF0udmFsdWUgPSBudWxsXG4gICAgICBpc0xvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgaGFzRXJyb3IudmFsdWUgPSBmYWxzZVxuICAgICAgZW1pdCgnbG9hZCcsIGltZy5jdXJyZW50U3JjIHx8IGltZy5zcmMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25FcnJvciAoZXJyKSB7XG4gICAgICBpZiAobG9hZFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChsb2FkVGltZXIpXG4gICAgICAgIGxvYWRUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaXNMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgIGhhc0Vycm9yLnZhbHVlID0gdHJ1ZVxuICAgICAgaW1hZ2VzWyBwb3NpdGlvbi52YWx1ZSBdLnZhbHVlID0gbnVsbFxuICAgICAgaW1hZ2VzWyBwb3NpdGlvbi52YWx1ZSBeIDEgXS52YWx1ZSA9IGdldFBsYWNlaG9sZGVyU3JjKClcbiAgICAgIGVtaXQoJ2Vycm9yJywgZXJyKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEltYWdlIChpbmRleCkge1xuICAgICAgY29uc3QgaW1nID0gaW1hZ2VzWyBpbmRleCBdLnZhbHVlXG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGtleTogJ2ltZ18nICsgaW5kZXgsXG4gICAgICAgIGNsYXNzOiBpbWdDbGFzcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IGltZ1N0eWxlLnZhbHVlLFxuICAgICAgICBjcm9zc29yaWdpbjogcHJvcHMuY3Jvc3NvcmlnaW4sXG4gICAgICAgIGRlY29kaW5nOiBwcm9wcy5kZWNvZGluZyxcbiAgICAgICAgcmVmZXJyZXJwb2xpY3k6IHByb3BzLnJlZmVycmVycG9saWN5LFxuICAgICAgICBoZWlnaHQ6IHByb3BzLmhlaWdodCxcbiAgICAgICAgd2lkdGg6IHByb3BzLndpZHRoLFxuICAgICAgICBsb2FkaW5nOiBwcm9wcy5sb2FkaW5nLFxuICAgICAgICBmZXRjaHByaW9yaXR5OiBwcm9wcy5mZXRjaHByaW9yaXR5LFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgIGRyYWdnYWJsZTogcHJvcHMuZHJhZ2dhYmxlLFxuICAgICAgICAuLi5pbWdcbiAgICAgIH1cblxuICAgICAgaWYgKHBvc2l0aW9uLnZhbHVlID09PSBpbmRleCkge1xuICAgICAgICBkYXRhLmNsYXNzICs9ICcgcS1pbWdfX2ltYWdlLS13YWl0aW5nJ1xuICAgICAgICBPYmplY3QuYXNzaWduKGRhdGEsIHsgb25Mb2FkLCBvbkVycm9yIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGF0YS5jbGFzcyArPSAnIHEtaW1nX19pbWFnZS0tbG9hZGVkJ1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHsgY2xhc3M6ICdxLWltZ19fY29udGFpbmVyIGFic29sdXRlLWZ1bGwnLCBrZXk6ICdpbWcnICsgaW5kZXggfSxcbiAgICAgICAgaCgnaW1nJywgZGF0YSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICAgIGlmIChpc0xvYWRpbmcudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICBrZXk6ICdjb250ZW50JyxcbiAgICAgICAgICBjbGFzczogJ3EtaW1nX19jb250ZW50IGFic29sdXRlLWZ1bGwgcS1hbmNob3ItLXNraXAnXG4gICAgICAgIH0sIGhTbG90KHNsb3RzWyBoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSA/ICdlcnJvcicgOiAnZGVmYXVsdCcgXSkpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGtleTogJ2xvYWRpbmcnLFxuICAgICAgICBjbGFzczogJ3EtaW1nX19sb2FkaW5nIGFic29sdXRlLWZ1bGwgZmxleCBmbGV4LWNlbnRlcidcbiAgICAgIH0sIChcbiAgICAgICAgc2xvdHMubG9hZGluZyAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBzbG90cy5sb2FkaW5nKClcbiAgICAgICAgICA6IChcbiAgICAgICAgICAgICAgcHJvcHMubm9TcGlubmVyID09PSB0cnVlXG4gICAgICAgICAgICAgICAgPyB2b2lkIDBcbiAgICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgICAgaChRU3Bpbm5lciwge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5zcGlubmVyQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgc2l6ZTogcHJvcHMuc3Bpbm5lclNpemVcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIClcbiAgICAgICkpXG4gICAgfVxuXG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSkge1xuICAgICAgaWYgKF9fUVVBU0FSX1NTUl9DTElFTlRfXykge1xuICAgICAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgICAgIGFkZEltYWdlKGdldEN1cnJlbnRTcmMoKSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhZGRJbWFnZShnZXRDdXJyZW50U3JjKCkpXG4gICAgICB9XG5cbiAgICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICAgIGlzRGVzdHJveWVkID0gdHJ1ZVxuXG4gICAgICAgIGlmIChsb2FkVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFRpbWVyKVxuICAgICAgICAgIGxvYWRUaW1lciA9IG51bGxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IFtdXG5cbiAgICAgIGlmIChyYXRpb1N0eWxlLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgICBoKCdkaXYnLCB7IGtleTogJ2ZpbGxlcicsIHN0eWxlOiByYXRpb1N0eWxlLnZhbHVlIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKGhhc0Vycm9yLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIGlmIChpbWFnZXNbIDAgXS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRlbnQucHVzaChnZXRJbWFnZSgwKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbWFnZXNbIDEgXS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRlbnQucHVzaChnZXRJbWFnZSgxKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb250ZW50LnB1c2goXG4gICAgICAgIGgoVHJhbnNpdGlvbiwgeyBuYW1lOiAncS10cmFuc2l0aW9uLS1mYWRlJyB9LCBnZXRDb250ZW50KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgICByb2xlOiAnaW1nJyxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5hbHRcbiAgICAgIH0sIGNvbnRlbnQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDYXJkU2VjdGlvbicsXG5cbiAgcHJvcHM6IHtcbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdkaXYnXG4gICAgfSxcblxuICAgIGhvcml6b250YWw6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtY2FyZF9fc2VjdGlvbidcbiAgICAgICsgYCBxLWNhcmRfX3NlY3Rpb24tLSR7IHByb3BzLmhvcml6b250YWwgPT09IHRydWUgPyAnaG9yaXogcm93IG5vLXdyYXAnIDogJ3ZlcnQnIH1gXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgocHJvcHMudGFnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNhcmQnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH0sXG5cbiAgICBzcXVhcmU6IEJvb2xlYW4sXG4gICAgZmxhdDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1jYXJkJ1xuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWNhcmQtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtY2FyZC0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtY2FyZC0tc3F1YXJlIG5vLWJvcmRlci1yYWRpdXMnIDogJycpXG4gICAgICArIChwcm9wcy5mbGF0ID09PSB0cnVlID8gJyBxLWNhcmQtLWZsYXQgbm8tc2hhZG93JyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKHByb3BzLnRhZywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImNvbnN0IHVuaXRzID0gWyAnQicsICdLQicsICdNQicsICdHQicsICdUQicsICdQQicgXVxuXG5leHBvcnQgZnVuY3Rpb24gaHVtYW5TdG9yYWdlU2l6ZSAoYnl0ZXMpIHtcbiAgbGV0IHUgPSAwXG5cbiAgd2hpbGUgKHBhcnNlSW50KGJ5dGVzLCAxMCkgPj0gMTAyNCAmJiB1IDwgdW5pdHMubGVuZ3RoIC0gMSkge1xuICAgIGJ5dGVzIC89IDEwMjRcbiAgICArK3VcbiAgfVxuXG4gIHJldHVybiBgJHsgYnl0ZXMudG9GaXhlZCgxKSB9JHsgdW5pdHNbIHUgXSB9YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZSAoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJldHdlZW4gKHYsIG1pbiwgbWF4KSB7XG4gIHJldHVybiBtYXggPD0gbWluXG4gICAgPyBtaW5cbiAgICA6IE1hdGgubWluKG1heCwgTWF0aC5tYXgobWluLCB2KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVRvSW50ZXJ2YWwgKHYsIG1pbiwgbWF4KSB7XG4gIGlmIChtYXggPD0gbWluKSB7XG4gICAgcmV0dXJuIG1pblxuICB9XG5cbiAgY29uc3Qgc2l6ZSA9IChtYXggLSBtaW4gKyAxKVxuXG4gIGxldCBpbmRleCA9IG1pbiArICh2IC0gbWluKSAlIHNpemVcbiAgaWYgKGluZGV4IDwgbWluKSB7XG4gICAgaW5kZXggPSBzaXplICsgaW5kZXhcbiAgfVxuXG4gIHJldHVybiBpbmRleCA9PT0gMCA/IDAgOiBpbmRleCAvLyBmaXggZm9yICgtYSAlIGEpID0+IC0wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYWQgKHYsIGxlbmd0aCA9IDIsIGNoYXIgPSAnMCcpIHtcbiAgaWYgKHYgPT09IHZvaWQgMCB8fCB2ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHZcbiAgfVxuXG4gIGNvbnN0IHZhbCA9ICcnICsgdlxuICByZXR1cm4gdmFsLmxlbmd0aCA+PSBsZW5ndGhcbiAgICA/IHZhbFxuICAgIDogbmV3IEFycmF5KGxlbmd0aCAtIHZhbC5sZW5ndGggKyAxKS5qb2luKGNoYXIpICsgdmFsXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaHVtYW5TdG9yYWdlU2l6ZSxcbiAgY2FwaXRhbGl6ZSxcbiAgYmV0d2VlbixcbiAgbm9ybWFsaXplVG9JbnRlcnZhbCxcbiAgcGFkXG59XG4iLCIvLyB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9qYWxhYWxpL2phbGFhbGktanNcblxuLypcbiAgSmFsYWFsaSB5ZWFycyBzdGFydGluZyB0aGUgMzMteWVhciBydWxlLlxuKi9cbmNvbnN0IGJyZWFrcyA9IFtcbiAgLTYxLCA5LCAzOCwgMTk5LCA0MjYsIDY4NiwgNzU2LCA4MTgsIDExMTEsIDExODEsIDEyMTAsXG4gIDE2MzUsIDIwNjAsIDIwOTcsIDIxOTIsIDIyNjIsIDIzMjQsIDIzOTQsIDI0NTYsIDMxNzhcbl1cblxuLypcbiAgQ29udmVydHMgYSBHcmVnb3JpYW4gZGF0ZSB0byBKYWxhYWxpLlxuKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0phbGFhbGkgKGd5LCBnbSwgZ2QpIHtcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChneSkgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgIGdkID0gZ3kuZ2V0RGF0ZSgpXG4gICAgZ20gPSBneS5nZXRNb250aCgpICsgMVxuICAgIGd5ID0gZ3kuZ2V0RnVsbFllYXIoKVxuICB9XG4gIHJldHVybiBkMmooZzJkKGd5LCBnbSwgZ2QpKVxufVxuXG4vKlxuICBDb252ZXJ0cyBhIEphbGFhbGkgZGF0ZSB0byBHcmVnb3JpYW4uXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHRvR3JlZ29yaWFuIChqeSwgam0sIGpkKSB7XG4gIHJldHVybiBkMmcoajJkKGp5LCBqbSwgamQpKVxufVxuXG4vKlxuICBJcyB0aGlzIGEgbGVhcCB5ZWFyIG9yIG5vdD9cbiovXG5mdW5jdGlvbiBpc0xlYXBKYWxhYWxpWWVhciAoankpIHtcbiAgcmV0dXJuIGphbENhbExlYXAoankpID09PSAwXG59XG5cbi8qXG4gIE51bWJlciBvZiBkYXlzIGluIGEgZ2l2ZW4gbW9udGggaW4gYSBKYWxhYWxpIHllYXIuXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGphbGFhbGlNb250aExlbmd0aCAoanksIGptKSB7XG4gIGlmIChqbSA8PSA2KSByZXR1cm4gMzFcbiAgaWYgKGptIDw9IDExKSByZXR1cm4gMzBcbiAgaWYgKGlzTGVhcEphbGFhbGlZZWFyKGp5KSkgcmV0dXJuIDMwXG4gIHJldHVybiAyOVxufVxuXG4vKlxuICAgIFRoaXMgZnVuY3Rpb24gZGV0ZXJtaW5lcyBpZiB0aGUgSmFsYWFsaSAoUGVyc2lhbikgeWVhciBpc1xuICAgIGxlYXAgKDM2Ni1kYXkgbG9uZykgb3IgaXMgdGhlIGNvbW1vbiB5ZWFyICgzNjUgZGF5cylcblxuICAgIEBwYXJhbSBqeSBKYWxhYWxpIGNhbGVuZGFyIHllYXIgKC02MSB0byAzMTc3KVxuICAgIEByZXR1cm5zIG51bWJlciBvZiB5ZWFycyBzaW5jZSB0aGUgbGFzdCBsZWFwIHllYXIgKDAgdG8gNClcbiAqL1xuZnVuY3Rpb24gamFsQ2FsTGVhcCAoankpIHtcbiAgY29uc3QgYmwgPSBicmVha3MubGVuZ3RoXG4gIGxldFxuICAgIGpwID0gYnJlYWtzWyAwIF0sXG4gICAgam0sXG4gICAganVtcCxcbiAgICBsZWFwLFxuICAgIG4sXG4gICAgaVxuXG4gIGlmIChqeSA8IGpwIHx8IGp5ID49IGJyZWFrc1sgYmwgLSAxIF0pIHsgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEphbGFhbGkgeWVhciAnICsgankpIH1cblxuICBmb3IgKGkgPSAxOyBpIDwgYmw7IGkgKz0gMSkge1xuICAgIGptID0gYnJlYWtzWyBpIF1cbiAgICBqdW1wID0gam0gLSBqcFxuICAgIGlmIChqeSA8IGptKSB7IGJyZWFrIH1cbiAgICBqcCA9IGptXG4gIH1cbiAgbiA9IGp5IC0ganBcblxuICBpZiAoanVtcCAtIG4gPCA2KSB7IG4gPSBuIC0ganVtcCArIGRpdihqdW1wICsgNCwgMzMpICogMzMgfVxuICBsZWFwID0gbW9kKG1vZChuICsgMSwgMzMpIC0gMSwgNClcbiAgaWYgKGxlYXAgPT09IC0xKSB7XG4gICAgbGVhcCA9IDRcbiAgfVxuXG4gIHJldHVybiBsZWFwXG59XG5cbi8qXG4gIFRoaXMgZnVuY3Rpb24gZGV0ZXJtaW5lcyBpZiB0aGUgSmFsYWFsaSAoUGVyc2lhbikgeWVhciBpc1xuICBsZWFwICgzNjYtZGF5IGxvbmcpIG9yIGlzIHRoZSBjb21tb24geWVhciAoMzY1IGRheXMpLCBhbmRcbiAgZmluZHMgdGhlIGRheSBpbiBNYXJjaCAoR3JlZ29yaWFuIGNhbGVuZGFyKSBvZiB0aGUgZmlyc3RcbiAgZGF5IG9mIHRoZSBKYWxhYWxpIHllYXIgKGp5KS5cblxuICBAcGFyYW0gankgSmFsYWFsaSBjYWxlbmRhciB5ZWFyICgtNjEgdG8gMzE3NylcbiAgQHBhcmFtIHdpdGhvdXRMZWFwIHdoZW4gZG9uJ3QgbmVlZCBsZWFwICh0cnVlIG9yIGZhbHNlKSBkZWZhdWx0IGlzIGZhbHNlXG4gIEByZXR1cm5cbiAgICBsZWFwOiBudW1iZXIgb2YgeWVhcnMgc2luY2UgdGhlIGxhc3QgbGVhcCB5ZWFyICgwIHRvIDQpXG4gICAgZ3k6IEdyZWdvcmlhbiB5ZWFyIG9mIHRoZSBiZWdpbm5pbmcgb2YgSmFsYWFsaSB5ZWFyXG4gICAgbWFyY2g6IHRoZSBNYXJjaCBkYXkgb2YgRmFydmFyZGluIHRoZSAxc3QgKDFzdCBkYXkgb2YgankpXG4gIEBzZWU6IGh0dHA6Ly93d3cuYXN0cm8udW5pLnRvcnVuLnBsL35rYi9QYXBlcnMvRU1QL1BlcnNpYW5DLUVNUC5odG1cbiAgQHNlZTogaHR0cDovL3d3dy5mb3VybWlsYWIuY2gvZG9jdW1lbnRzL2NhbGVuZGFyL1xuKi9cbmZ1bmN0aW9uIGphbENhbCAoanksIHdpdGhvdXRMZWFwKSB7XG4gIGNvbnN0XG4gICAgYmwgPSBicmVha3MubGVuZ3RoLFxuICAgIGd5ID0gankgKyA2MjFcbiAgbGV0XG4gICAgbGVhcEogPSAtMTQsXG4gICAganAgPSBicmVha3NbIDAgXSxcbiAgICBqbSxcbiAgICBqdW1wLFxuICAgIGxlYXAsXG4gICAgbixcbiAgICBpXG5cbiAgaWYgKGp5IDwganAgfHwgankgPj0gYnJlYWtzWyBibCAtIDEgXSkgeyB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgSmFsYWFsaSB5ZWFyICcgKyBqeSkgfVxuXG4gIC8vIEZpbmQgdGhlIGxpbWl0aW5nIHllYXJzIGZvciB0aGUgSmFsYWFsaSB5ZWFyIGp5LlxuICBmb3IgKGkgPSAxOyBpIDwgYmw7IGkgKz0gMSkge1xuICAgIGptID0gYnJlYWtzWyBpIF1cbiAgICBqdW1wID0gam0gLSBqcFxuICAgIGlmIChqeSA8IGptKSB7IGJyZWFrIH1cbiAgICBsZWFwSiA9IGxlYXBKICsgZGl2KGp1bXAsIDMzKSAqIDggKyBkaXYobW9kKGp1bXAsIDMzKSwgNClcbiAgICBqcCA9IGptXG4gIH1cbiAgbiA9IGp5IC0ganBcblxuICAvLyBGaW5kIHRoZSBudW1iZXIgb2YgbGVhcCB5ZWFycyBmcm9tIEFEIDYyMSB0byB0aGUgYmVnaW5uaW5nXG4gIC8vIG9mIHRoZSBjdXJyZW50IEphbGFhbGkgeWVhciBpbiB0aGUgUGVyc2lhbiBjYWxlbmRhci5cbiAgbGVhcEogPSBsZWFwSiArIGRpdihuLCAzMykgKiA4ICsgZGl2KG1vZChuLCAzMykgKyAzLCA0KVxuICBpZiAobW9kKGp1bXAsIDMzKSA9PT0gNCAmJiBqdW1wIC0gbiA9PT0gNCkgeyBsZWFwSiArPSAxIH1cblxuICAvLyBBbmQgdGhlIHNhbWUgaW4gdGhlIEdyZWdvcmlhbiBjYWxlbmRhciAodW50aWwgdGhlIHllYXIgZ3kpLlxuICBjb25zdCBsZWFwRyA9IGRpdihneSwgNCkgLSBkaXYoKGRpdihneSwgMTAwKSArIDEpICogMywgNCkgLSAxNTBcblxuICAvLyBEZXRlcm1pbmUgdGhlIEdyZWdvcmlhbiBkYXRlIG9mIEZhcnZhcmRpbiB0aGUgMXN0LlxuICBjb25zdCBtYXJjaCA9IDIwICsgbGVhcEogLSBsZWFwR1xuXG4gIC8vIEZpbmQgaG93IG1hbnkgeWVhcnMgaGF2ZSBwYXNzZWQgc2luY2UgdGhlIGxhc3QgbGVhcCB5ZWFyLlxuICBpZiAoIXdpdGhvdXRMZWFwKSB7XG4gICAgaWYgKGp1bXAgLSBuIDwgNikgeyBuID0gbiAtIGp1bXAgKyBkaXYoanVtcCArIDQsIDMzKSAqIDMzIH1cbiAgICBsZWFwID0gbW9kKG1vZChuICsgMSwgMzMpIC0gMSwgNClcbiAgICBpZiAobGVhcCA9PT0gLTEpIHtcbiAgICAgIGxlYXAgPSA0XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsZWFwLFxuICAgIGd5LFxuICAgIG1hcmNoXG4gIH1cbn1cblxuLypcbiAgQ29udmVydHMgYSBkYXRlIG9mIHRoZSBKYWxhYWxpIGNhbGVuZGFyIHRvIHRoZSBKdWxpYW4gRGF5IG51bWJlci5cblxuICBAcGFyYW0gankgSmFsYWFsaSB5ZWFyICgxIHRvIDMxMDApXG4gIEBwYXJhbSBqbSBKYWxhYWxpIG1vbnRoICgxIHRvIDEyKVxuICBAcGFyYW0gamQgSmFsYWFsaSBkYXkgKDEgdG8gMjkvMzEpXG4gIEByZXR1cm4gSnVsaWFuIERheSBudW1iZXJcbiovXG5mdW5jdGlvbiBqMmQgKGp5LCBqbSwgamQpIHtcbiAgY29uc3QgciA9IGphbENhbChqeSwgdHJ1ZSlcbiAgcmV0dXJuIGcyZChyLmd5LCAzLCByLm1hcmNoKSArIChqbSAtIDEpICogMzEgLSBkaXYoam0sIDcpICogKGptIC0gNykgKyBqZCAtIDFcbn1cblxuLypcbiAgQ29udmVydHMgdGhlIEp1bGlhbiBEYXkgbnVtYmVyIHRvIGEgZGF0ZSBpbiB0aGUgSmFsYWFsaSBjYWxlbmRhci5cblxuICBAcGFyYW0gamRuIEp1bGlhbiBEYXkgbnVtYmVyXG4gIEByZXR1cm5cbiAgICBqeTogSmFsYWFsaSB5ZWFyICgxIHRvIDMxMDApXG4gICAgam06IEphbGFhbGkgbW9udGggKDEgdG8gMTIpXG4gICAgamQ6IEphbGFhbGkgZGF5ICgxIHRvIDI5LzMxKVxuKi9cbmZ1bmN0aW9uIGQyaiAoamRuKSB7XG4gIGNvbnN0IGd5ID0gZDJnKGpkbikuZ3kgLy8gQ2FsY3VsYXRlIEdyZWdvcmlhbiB5ZWFyIChneSkuXG4gIGxldFxuICAgIGp5ID0gZ3kgLSA2MjEsXG4gICAgamQsXG4gICAgam0sXG4gICAga1xuICBjb25zdFxuICAgIHIgPSBqYWxDYWwoanksIGZhbHNlKSxcbiAgICBqZG4xZiA9IGcyZChneSwgMywgci5tYXJjaClcblxuICAvLyBGaW5kIG51bWJlciBvZiBkYXlzIHRoYXQgcGFzc2VkIHNpbmNlIDEgRmFydmFyZGluLlxuICBrID0gamRuIC0gamRuMWZcbiAgaWYgKGsgPj0gMCkge1xuICAgIGlmIChrIDw9IDE4NSkge1xuICAgICAgLy8gVGhlIGZpcnN0IDYgbW9udGhzLlxuICAgICAgam0gPSAxICsgZGl2KGssIDMxKVxuICAgICAgamQgPSBtb2QoaywgMzEpICsgMVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAganksXG4gICAgICAgIGptLFxuICAgICAgICBqZFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIFRoZSByZW1haW5pbmcgbW9udGhzLlxuICAgICAgayAtPSAxODZcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gUHJldmlvdXMgSmFsYWFsaSB5ZWFyLlxuICAgIGp5IC09IDFcbiAgICBrICs9IDE3OVxuICAgIGlmIChyLmxlYXAgPT09IDEpIHsgayArPSAxIH1cbiAgfVxuICBqbSA9IDcgKyBkaXYoaywgMzApXG4gIGpkID0gbW9kKGssIDMwKSArIDFcbiAgcmV0dXJuIHtcbiAgICBqeSxcbiAgICBqbSxcbiAgICBqZFxuICB9XG59XG5cbi8qXG4gIENhbGN1bGF0ZXMgdGhlIEp1bGlhbiBEYXkgbnVtYmVyIGZyb20gR3JlZ29yaWFuIG9yIEp1bGlhblxuICBjYWxlbmRhciBkYXRlcy4gVGhpcyBpbnRlZ2VyIG51bWJlciBjb3JyZXNwb25kcyB0byB0aGUgbm9vbiBvZlxuICB0aGUgZGF0ZSAoaS5lLiAxMiBob3VycyBvZiBVbml2ZXJzYWwgVGltZSkuXG4gIFRoZSBwcm9jZWR1cmUgd2FzIHRlc3RlZCB0byBiZSBnb29kIHNpbmNlIDEgTWFyY2gsIC0xMDAxMDAgKG9mIGJvdGhcbiAgY2FsZW5kYXJzKSB1cCB0byBhIGZldyBtaWxsaW9uIHllYXJzIGludG8gdGhlIGZ1dHVyZS5cblxuICBAcGFyYW0gZ3kgQ2FsZW5kYXIgeWVhciAoeWVhcnMgQkMgbnVtYmVyZWQgMCwgLTEsIC0yLCAuLi4pXG4gIEBwYXJhbSBnbSBDYWxlbmRhciBtb250aCAoMSB0byAxMilcbiAgQHBhcmFtIGdkIENhbGVuZGFyIGRheSBvZiB0aGUgbW9udGggKDEgdG8gMjgvMjkvMzAvMzEpXG4gIEByZXR1cm4gSnVsaWFuIERheSBudW1iZXJcbiovXG5mdW5jdGlvbiBnMmQgKGd5LCBnbSwgZ2QpIHtcbiAgbGV0IGQgPSBkaXYoKGd5ICsgZGl2KGdtIC0gOCwgNikgKyAxMDAxMDApICogMTQ2MSwgNClcbiAgICAgICsgZGl2KDE1MyAqIG1vZChnbSArIDksIDEyKSArIDIsIDUpXG4gICAgICArIGdkIC0gMzQ4NDA0MDhcbiAgZCA9IGQgLSBkaXYoZGl2KGd5ICsgMTAwMTAwICsgZGl2KGdtIC0gOCwgNiksIDEwMCkgKiAzLCA0KSArIDc1MlxuICByZXR1cm4gZFxufVxuXG4vKlxuICBDYWxjdWxhdGVzIEdyZWdvcmlhbiBhbmQgSnVsaWFuIGNhbGVuZGFyIGRhdGVzIGZyb20gdGhlIEp1bGlhbiBEYXkgbnVtYmVyXG4gIChqZG4pIGZvciB0aGUgcGVyaW9kIHNpbmNlIGpkbj0tMzQ4Mzk2NTUgKGkuZS4gdGhlIHllYXIgLTEwMDEwMCBvZiBib3RoXG4gIGNhbGVuZGFycykgdG8gc29tZSBtaWxsaW9ucyB5ZWFycyBhaGVhZCBvZiB0aGUgcHJlc2VudC5cblxuICBAcGFyYW0gamRuIEp1bGlhbiBEYXkgbnVtYmVyXG4gIEByZXR1cm5cbiAgICBneTogQ2FsZW5kYXIgeWVhciAoeWVhcnMgQkMgbnVtYmVyZWQgMCwgLTEsIC0yLCAuLi4pXG4gICAgZ206IENhbGVuZGFyIG1vbnRoICgxIHRvIDEyKVxuICAgIGdkOiBDYWxlbmRhciBkYXkgb2YgdGhlIG1vbnRoIE0gKDEgdG8gMjgvMjkvMzAvMzEpXG4qL1xuZnVuY3Rpb24gZDJnIChqZG4pIHtcbiAgbGV0IGogPSA0ICogamRuICsgMTM5MzYxNjMxXG4gIGogPSBqICsgZGl2KGRpdig0ICogamRuICsgMTgzMTg3NzIwLCAxNDYwOTcpICogMywgNCkgKiA0IC0gMzkwOFxuICBjb25zdFxuICAgIGkgPSBkaXYobW9kKGosIDE0NjEpLCA0KSAqIDUgKyAzMDgsXG4gICAgZ2QgPSBkaXYobW9kKGksIDE1MyksIDUpICsgMSxcbiAgICBnbSA9IG1vZChkaXYoaSwgMTUzKSwgMTIpICsgMSxcbiAgICBneSA9IGRpdihqLCAxNDYxKSAtIDEwMDEwMCArIGRpdig4IC0gZ20sIDYpXG4gIHJldHVybiB7XG4gICAgZ3ksXG4gICAgZ20sXG4gICAgZ2RcbiAgfVxufVxuXG4vKlxuICBVdGlsaXR5IGhlbHBlciBmdW5jdGlvbnMuXG4qL1xuXG5mdW5jdGlvbiBkaXYgKGEsIGIpIHtcbiAgcmV0dXJuIH5+KGEgLyBiKVxufVxuXG5mdW5jdGlvbiBtb2QgKGEsIGIpIHtcbiAgcmV0dXJuIGEgLSB+fihhIC8gYikgKiBiXG59XG4iLCIvKiBlc2xpbnQgbm8tZmFsbHRocm91Z2g6IDAgKi9cblxuaW1wb3J0IHsgaXNEYXRlIH0gZnJvbSAnLi9pcy5qcydcbmltcG9ydCB7IHBhZCwgY2FwaXRhbGl6ZSB9IGZyb20gJy4vZm9ybWF0LmpzJ1xuaW1wb3J0IHsgamFsYWFsaU1vbnRoTGVuZ3RoIH0gZnJvbSAnLi9wcml2YXRlL2RhdGUtcGVyc2lhbi5qcydcbmltcG9ydCBsYW5nLCB7IGRlZmF1bHRMYW5nIH0gZnJvbSAnLi4vbGFuZy5qcydcblxuY29uc3RcbiAgTUlMTElTRUNPTkRTX0lOX0RBWSA9IDg2NDAwMDAwLFxuICBNSUxMSVNFQ09ORFNfSU5fSE9VUiA9IDM2MDAwMDAsXG4gIE1JTExJU0VDT05EU19JTl9NSU5VVEUgPSA2MDAwMCxcbiAgZGVmYXVsdE1hc2sgPSAnWVlZWS1NTS1ERFRISDptbTpzcy5TU1NaJyxcbiAgdG9rZW4gPSAvXFxbKCg/OlteXFxdXFxcXF18XFxcXF18XFxcXCkqKVxcXXxkezEsNH18TXsxLDR9fG17MSwyfXx3ezEsMn18UW98RG98RHsxLDR9fFlZKD86WVkpP3xIezEsMn18aHsxLDJ9fHN7MSwyfXxTezEsM318WnsxLDJ9fGF7MSwyfXxbQVFFeFhdL2csXG4gIHJldmVyc2VUb2tlbiA9IC8oXFxbW15cXF1dKlxcXSl8ZHsxLDR9fE17MSw0fXxtezEsMn18d3sxLDJ9fFFvfERvfER7MSw0fXxZWSg/OllZKT98SHsxLDJ9fGh7MSwyfXxzezEsMn18U3sxLDN9fFp7MSwyfXxhezEsMn18W0FRRXhYXXwoWy4qKzo/XixcXHMke30oKXxcXFxcXSspL2csXG4gIHJlZ2V4U3RvcmUgPSB7fVxuXG5mdW5jdGlvbiBnZXRSZWdleERhdGEgKG1hc2ssIGRhdGVMb2NhbGUpIHtcbiAgY29uc3RcbiAgICBkYXlzID0gJygnICsgZGF0ZUxvY2FsZS5kYXlzLmpvaW4oJ3wnKSArICcpJyxcbiAgICBrZXkgPSBtYXNrICsgZGF5c1xuXG4gIGlmIChyZWdleFN0b3JlWyBrZXkgXSAhPT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIHJlZ2V4U3RvcmVbIGtleSBdXG4gIH1cblxuICBjb25zdFxuICAgIGRheXNTaG9ydCA9ICcoJyArIGRhdGVMb2NhbGUuZGF5c1Nob3J0LmpvaW4oJ3wnKSArICcpJyxcbiAgICBtb250aHMgPSAnKCcgKyBkYXRlTG9jYWxlLm1vbnRocy5qb2luKCd8JykgKyAnKScsXG4gICAgbW9udGhzU2hvcnQgPSAnKCcgKyBkYXRlTG9jYWxlLm1vbnRoc1Nob3J0LmpvaW4oJ3wnKSArICcpJ1xuXG4gIGNvbnN0IG1hcCA9IHt9XG4gIGxldCBpbmRleCA9IDBcblxuICBjb25zdCByZWdleFRleHQgPSBtYXNrLnJlcGxhY2UocmV2ZXJzZVRva2VuLCBtYXRjaCA9PiB7XG4gICAgaW5kZXgrK1xuICAgIHN3aXRjaCAobWF0Y2gpIHtcbiAgICAgIGNhc2UgJ1lZJzpcbiAgICAgICAgbWFwLllZID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoLT9cXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ1lZWVknOlxuICAgICAgICBtYXAuWVlZWSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKC0/XFxcXGR7MSw0fSknXG4gICAgICBjYXNlICdNJzpcbiAgICAgICAgbWFwLk0gPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ01NJzpcbiAgICAgICAgbWFwLk0gPSBpbmRleCAvLyBidW1waW5nIHRvIE1cbiAgICAgICAgcmV0dXJuICcoXFxcXGR7Mn0pJ1xuICAgICAgY2FzZSAnTU1NJzpcbiAgICAgICAgbWFwLk1NTSA9IGluZGV4XG4gICAgICAgIHJldHVybiBtb250aHNTaG9ydFxuICAgICAgY2FzZSAnTU1NTSc6XG4gICAgICAgIG1hcC5NTU1NID0gaW5kZXhcbiAgICAgICAgcmV0dXJuIG1vbnRoc1xuICAgICAgY2FzZSAnRCc6XG4gICAgICAgIG1hcC5EID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfSknXG4gICAgICBjYXNlICdEbyc6XG4gICAgICAgIG1hcC5EID0gaW5kZXgrKyAvLyBidW1waW5nIHRvIERcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfShzdHxuZHxyZHx0aCkpJ1xuICAgICAgY2FzZSAnREQnOlxuICAgICAgICBtYXAuRCA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gRFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdIJzpcbiAgICAgICAgbWFwLkggPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ0hIJzpcbiAgICAgICAgbWFwLkggPSBpbmRleCAvLyBidW1waW5nIHRvIEhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7Mn0pJ1xuICAgICAgY2FzZSAnaCc6XG4gICAgICAgIG1hcC5oID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfSknXG4gICAgICBjYXNlICdoaCc6XG4gICAgICAgIG1hcC5oID0gaW5kZXggLy8gYnVtcGluZyB0byBoXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ20nOlxuICAgICAgICBtYXAubSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnbW0nOlxuICAgICAgICBtYXAubSA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gbVxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdzJzpcbiAgICAgICAgbWFwLnMgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ3NzJzpcbiAgICAgICAgbWFwLnMgPSBpbmRleCAvLyBidW1waW5nIHRvIHNcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7Mn0pJ1xuICAgICAgY2FzZSAnUyc6XG4gICAgICAgIG1hcC5TID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MX0pJ1xuICAgICAgY2FzZSAnU1MnOlxuICAgICAgICBtYXAuUyA9IGluZGV4IC8vIGJ1bXAgdG8gU1xuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdTU1MnOlxuICAgICAgICBtYXAuUyA9IGluZGV4IC8vIGJ1bXAgdG8gU1xuICAgICAgICByZXR1cm4gJyhcXFxcZHszfSknXG4gICAgICBjYXNlICdBJzpcbiAgICAgICAgbWFwLkEgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhBTXxQTSknXG4gICAgICBjYXNlICdhJzpcbiAgICAgICAgbWFwLmEgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhhbXxwbSknXG4gICAgICBjYXNlICdhYSc6XG4gICAgICAgIG1hcC5hYSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKGFcXFxcLm1cXFxcLnxwXFxcXC5tXFxcXC4pJ1xuXG4gICAgICBjYXNlICdkZGQnOlxuICAgICAgICByZXR1cm4gZGF5c1Nob3J0XG4gICAgICBjYXNlICdkZGRkJzpcbiAgICAgICAgcmV0dXJuIGRheXNcbiAgICAgIGNhc2UgJ1EnOlxuICAgICAgY2FzZSAnZCc6XG4gICAgICBjYXNlICdFJzpcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MX0pJ1xuICAgICAgY2FzZSAnUW8nOlxuICAgICAgICByZXR1cm4gJygxc3R8Mm5kfDNyZHw0dGgpJ1xuICAgICAgY2FzZSAnREREJzpcbiAgICAgIGNhc2UgJ0REREQnOlxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDN9KSdcbiAgICAgIGNhc2UgJ3cnOlxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ3d3JzpcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7Mn0pJ1xuXG4gICAgICBjYXNlICdaJzogLy8gdG8gc3BsaXQ6ICg/OihaKSgpKCl8KFsrLV0pPyhcXFxcZHsyfSk6PyhcXFxcZHsyfSkpXG4gICAgICAgIG1hcC5aID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoWnxbKy1dXFxcXGR7Mn06XFxcXGR7Mn0pJ1xuICAgICAgY2FzZSAnWlonOlxuICAgICAgICBtYXAuWlogPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhafFsrLV1cXFxcZHsyfVxcXFxkezJ9KSdcblxuICAgICAgY2FzZSAnWCc6XG4gICAgICAgIG1hcC5YID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoLT9cXFxcZCspJ1xuICAgICAgY2FzZSAneCc6XG4gICAgICAgIG1hcC54ID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoLT9cXFxcZHs0LH0pJ1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpbmRleC0tXG4gICAgICAgIGlmIChtYXRjaFsgMCBdID09PSAnWycpIHtcbiAgICAgICAgICBtYXRjaCA9IG1hdGNoLnN1YnN0cmluZygxLCBtYXRjaC5sZW5ndGggLSAxKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRjaC5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IHJlcyA9IHsgbWFwLCByZWdleDogbmV3IFJlZ0V4cCgnXicgKyByZWdleFRleHQpIH1cbiAgcmVnZXhTdG9yZVsga2V5IF0gPSByZXNcblxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGdldERhdGVMb2NhbGUgKHBhcmFtRGF0ZUxvY2FsZSwgbGFuZ1Byb3BzKSB7XG4gIHJldHVybiBwYXJhbURhdGVMb2NhbGUgIT09IHZvaWQgMFxuICAgID8gcGFyYW1EYXRlTG9jYWxlXG4gICAgOiAoXG4gICAgICAgIGxhbmdQcm9wcyAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBsYW5nUHJvcHMuZGF0ZVxuICAgICAgICAgIDogZGVmYXVsdExhbmcuZGF0ZVxuICAgICAgKVxufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZSAob2Zmc2V0LCBkZWxpbWV0ZXIgPSAnJykge1xuICBjb25zdFxuICAgIHNpZ24gPSBvZmZzZXQgPiAwID8gJy0nIDogJysnLFxuICAgIGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldCksXG4gICAgaG91cnMgPSBNYXRoLmZsb29yKGFic09mZnNldCAvIDYwKSxcbiAgICBtaW51dGVzID0gYWJzT2Zmc2V0ICUgNjBcblxuICByZXR1cm4gc2lnbiArIHBhZChob3VycykgKyBkZWxpbWV0ZXIgKyBwYWQobWludXRlcylcbn1cblxuZnVuY3Rpb24gYXBwbHlZZWFyTW9udGhEYXlDaGFuZ2UgKGRhdGUsIG1vZCwgc2lnbikge1xuICBsZXRcbiAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG5cbiAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKClcblxuICBpZiAobW9kLnllYXIgIT09IHZvaWQgMCkge1xuICAgIHllYXIgKz0gc2lnbiAqIG1vZC55ZWFyXG4gICAgZGVsZXRlIG1vZC55ZWFyXG4gIH1cblxuICBpZiAobW9kLm1vbnRoICE9PSB2b2lkIDApIHtcbiAgICBtb250aCArPSBzaWduICogbW9kLm1vbnRoXG4gICAgZGVsZXRlIG1vZC5tb250aFxuICB9XG5cbiAgZGF0ZS5zZXREYXRlKDEpXG4gIGRhdGUuc2V0TW9udGgoMilcblxuICBkYXRlLnNldEZ1bGxZZWFyKHllYXIpXG4gIGRhdGUuc2V0TW9udGgobW9udGgpXG4gIGRhdGUuc2V0RGF0ZShNYXRoLm1pbihkYXksIGRheXNJbk1vbnRoKGRhdGUpKSlcblxuICBpZiAobW9kLmRhdGUgIT09IHZvaWQgMCkge1xuICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIHNpZ24gKiBtb2QuZGF0ZSlcbiAgICBkZWxldGUgbW9kLmRhdGVcbiAgfVxuXG4gIHJldHVybiBkYXRlXG59XG5cbmZ1bmN0aW9uIGFwcGx5WWVhck1vbnRoRGF5IChkYXRlLCBtb2QsIG1pZGRsZSkge1xuICBjb25zdFxuICAgIHllYXIgPSBtb2QueWVhciAhPT0gdm9pZCAwID8gbW9kLnllYXIgOiBkYXRlWyBgZ2V0JHsgbWlkZGxlIH1GdWxsWWVhcmAgXSgpLFxuICAgIG1vbnRoID0gbW9kLm1vbnRoICE9PSB2b2lkIDAgPyBtb2QubW9udGggLSAxIDogZGF0ZVsgYGdldCR7IG1pZGRsZSB9TW9udGhgIF0oKSxcbiAgICBtYXhEYXkgPSAobmV3IERhdGUoeWVhciwgbW9udGggKyAxLCAwKSkuZ2V0RGF0ZSgpLFxuICAgIGRheSA9IE1hdGgubWluKG1heERheSwgbW9kLmRhdGUgIT09IHZvaWQgMCA/IG1vZC5kYXRlIDogZGF0ZVsgYGdldCR7IG1pZGRsZSB9RGF0ZWAgXSgpKVxuXG4gIGRhdGVbIGBzZXQkeyBtaWRkbGUgfURhdGVgIF0oMSlcbiAgZGF0ZVsgYHNldCR7IG1pZGRsZSB9TW9udGhgIF0oMilcblxuICBkYXRlWyBgc2V0JHsgbWlkZGxlIH1GdWxsWWVhcmAgXSh5ZWFyKVxuICBkYXRlWyBgc2V0JHsgbWlkZGxlIH1Nb250aGAgXShtb250aClcbiAgZGF0ZVsgYHNldCR7IG1pZGRsZSB9RGF0ZWAgXShkYXkpXG5cbiAgZGVsZXRlIG1vZC55ZWFyXG4gIGRlbGV0ZSBtb2QubW9udGhcbiAgZGVsZXRlIG1vZC5kYXRlXG5cbiAgcmV0dXJuIGRhdGVcbn1cblxuZnVuY3Rpb24gZ2V0Q2hhbmdlIChkYXRlLCByYXdNb2QsIHNpZ24pIHtcbiAgY29uc3RcbiAgICBtb2QgPSBub3JtYWxpemVNb2QocmF3TW9kKSxcbiAgICBkID0gbmV3IERhdGUoZGF0ZSksXG4gICAgdCA9IG1vZC55ZWFyICE9PSB2b2lkIDAgfHwgbW9kLm1vbnRoICE9PSB2b2lkIDAgfHwgbW9kLmRhdGUgIT09IHZvaWQgMFxuICAgICAgPyBhcHBseVllYXJNb250aERheUNoYW5nZShkLCBtb2QsIHNpZ24pIC8vIHJlbW92ZXMgeWVhci9tb250aC9kYXlcbiAgICAgIDogZFxuXG4gIGZvciAoY29uc3Qga2V5IGluIG1vZCkge1xuICAgIGNvbnN0IG9wID0gY2FwaXRhbGl6ZShrZXkpXG4gICAgdFsgYHNldCR7IG9wIH1gIF0odFsgYGdldCR7IG9wIH1gIF0oKSArIHNpZ24gKiBtb2RbIGtleSBdKVxuICB9XG5cbiAgcmV0dXJuIHRcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplTW9kIChtb2QpIHtcbiAgY29uc3QgYWNjID0geyAuLi5tb2QgfVxuXG4gIGlmIChtb2QueWVhcnMgIT09IHZvaWQgMCkge1xuICAgIGFjYy55ZWFyID0gbW9kLnllYXJzXG4gICAgZGVsZXRlIGFjYy55ZWFyc1xuICB9XG5cbiAgaWYgKG1vZC5tb250aHMgIT09IHZvaWQgMCkge1xuICAgIGFjYy5tb250aCA9IG1vZC5tb250aHNcbiAgICBkZWxldGUgYWNjLm1vbnRoc1xuICB9XG5cbiAgaWYgKG1vZC5kYXlzICE9PSB2b2lkIDApIHtcbiAgICBhY2MuZGF0ZSA9IG1vZC5kYXlzXG4gICAgZGVsZXRlIGFjYy5kYXlzXG4gIH1cbiAgaWYgKG1vZC5kYXkgIT09IHZvaWQgMCkge1xuICAgIGFjYy5kYXRlID0gbW9kLmRheVxuICAgIGRlbGV0ZSBhY2MuZGF5XG4gIH1cblxuICBpZiAobW9kLmhvdXIgIT09IHZvaWQgMCkge1xuICAgIGFjYy5ob3VycyA9IG1vZC5ob3VyXG4gICAgZGVsZXRlIGFjYy5ob3VyXG4gIH1cblxuICBpZiAobW9kLm1pbnV0ZSAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLm1pbnV0ZXMgPSBtb2QubWludXRlXG4gICAgZGVsZXRlIGFjYy5taW51dGVcbiAgfVxuXG4gIGlmIChtb2Quc2Vjb25kICE9PSB2b2lkIDApIHtcbiAgICBhY2Muc2Vjb25kcyA9IG1vZC5zZWNvbmRcbiAgICBkZWxldGUgYWNjLnNlY29uZFxuICB9XG5cbiAgaWYgKG1vZC5taWxsaXNlY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLm1pbGxpc2Vjb25kcyA9IG1vZC5taWxsaXNlY29uZFxuICAgIGRlbGV0ZSBhY2MubWlsbGlzZWNvbmRcbiAgfVxuXG4gIHJldHVybiBhY2Ncbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkanVzdERhdGUgKGRhdGUsIHJhd01vZCwgdXRjKSB7XG4gIGNvbnN0XG4gICAgbW9kID0gbm9ybWFsaXplTW9kKHJhd01vZCksXG4gICAgbWlkZGxlID0gdXRjID09PSB0cnVlID8gJ1VUQycgOiAnJyxcbiAgICBkID0gbmV3IERhdGUoZGF0ZSksXG4gICAgdCA9IG1vZC55ZWFyICE9PSB2b2lkIDAgfHwgbW9kLm1vbnRoICE9PSB2b2lkIDAgfHwgbW9kLmRhdGUgIT09IHZvaWQgMFxuICAgICAgPyBhcHBseVllYXJNb250aERheShkLCBtb2QsIG1pZGRsZSkgLy8gcmVtb3ZlcyB5ZWFyL21vbnRoL2RheVxuICAgICAgOiBkXG5cbiAgZm9yIChjb25zdCBrZXkgaW4gbW9kKSB7XG4gICAgY29uc3Qgb3AgPSBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSlcbiAgICB0WyBgc2V0JHsgbWlkZGxlIH0keyBvcCB9YCBdKG1vZFsga2V5IF0pXG4gIH1cblxuICByZXR1cm4gdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdERhdGUgKHN0ciwgbWFzaywgZGF0ZUxvY2FsZSkge1xuICBjb25zdCBkID0gX19zcGxpdERhdGUoc3RyLCBtYXNrLCBkYXRlTG9jYWxlKVxuXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShcbiAgICBkLnllYXIsXG4gICAgZC5tb250aCA9PT0gbnVsbCA/IG51bGwgOiBkLm1vbnRoIC0gMSxcbiAgICBkLmRheSA9PT0gbnVsbCA/IDEgOiBkLmRheSxcbiAgICBkLmhvdXIsXG4gICAgZC5taW51dGUsXG4gICAgZC5zZWNvbmQsXG4gICAgZC5taWxsaXNlY29uZFxuICApXG5cbiAgY29uc3QgdHpPZmZzZXQgPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KClcblxuICByZXR1cm4gZC50aW1lem9uZU9mZnNldCA9PT0gbnVsbCB8fCBkLnRpbWV6b25lT2Zmc2V0ID09PSB0ek9mZnNldFxuICAgID8gZGF0ZVxuICAgIDogZ2V0Q2hhbmdlKGRhdGUsIHsgbWludXRlczogZC50aW1lem9uZU9mZnNldCAtIHR6T2Zmc2V0IH0sIDEpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NwbGl0RGF0ZSAoc3RyLCBtYXNrLCBkYXRlTG9jYWxlLCBjYWxlbmRhciwgZGVmYXVsdE1vZGVsKSB7XG4gIGNvbnN0IGRhdGUgPSB7XG4gICAgeWVhcjogbnVsbCxcbiAgICBtb250aDogbnVsbCxcbiAgICBkYXk6IG51bGwsXG4gICAgaG91cjogbnVsbCxcbiAgICBtaW51dGU6IG51bGwsXG4gICAgc2Vjb25kOiBudWxsLFxuICAgIG1pbGxpc2Vjb25kOiBudWxsLFxuICAgIHRpbWV6b25lT2Zmc2V0OiBudWxsLFxuICAgIGRhdGVIYXNoOiBudWxsLFxuICAgIHRpbWVIYXNoOiBudWxsXG4gIH1cblxuICBkZWZhdWx0TW9kZWwgIT09IHZvaWQgMCAmJiBPYmplY3QuYXNzaWduKGRhdGUsIGRlZmF1bHRNb2RlbClcblxuICBpZiAoXG4gICAgc3RyID09PSB2b2lkIDBcbiAgICB8fCBzdHIgPT09IG51bGxcbiAgICB8fCBzdHIgPT09ICcnXG4gICAgfHwgdHlwZW9mIHN0ciAhPT0gJ3N0cmluZydcbiAgKSB7XG4gICAgcmV0dXJuIGRhdGVcbiAgfVxuXG4gIGlmIChtYXNrID09PSB2b2lkIDApIHtcbiAgICBtYXNrID0gZGVmYXVsdE1hc2tcbiAgfVxuXG4gIGNvbnN0XG4gICAgbGFuZ09wdHMgPSBnZXREYXRlTG9jYWxlKGRhdGVMb2NhbGUsIGxhbmcucHJvcHMpLFxuICAgIG1vbnRocyA9IGxhbmdPcHRzLm1vbnRocyxcbiAgICBtb250aHNTaG9ydCA9IGxhbmdPcHRzLm1vbnRoc1Nob3J0XG5cbiAgY29uc3QgeyByZWdleCwgbWFwIH0gPSBnZXRSZWdleERhdGEobWFzaywgbGFuZ09wdHMpXG5cbiAgY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2gocmVnZXgpXG5cbiAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGRhdGVcbiAgfVxuXG4gIGxldCB0elN0cmluZyA9ICcnXG5cbiAgaWYgKG1hcC5YICE9PSB2b2lkIDAgfHwgbWFwLnggIT09IHZvaWQgMCkge1xuICAgIGNvbnN0IHN0YW1wID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5YICE9PSB2b2lkIDAgPyBtYXAuWCA6IG1hcC54IF0sIDEwKVxuXG4gICAgaWYgKGlzTmFOKHN0YW1wKSA9PT0gdHJ1ZSB8fCBzdGFtcCA8IDApIHtcbiAgICAgIHJldHVybiBkYXRlXG4gICAgfVxuXG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKHN0YW1wICogKG1hcC5YICE9PSB2b2lkIDAgPyAxMDAwIDogMSkpXG5cbiAgICBkYXRlLnllYXIgPSBkLmdldEZ1bGxZZWFyKClcbiAgICBkYXRlLm1vbnRoID0gZC5nZXRNb250aCgpICsgMVxuICAgIGRhdGUuZGF5ID0gZC5nZXREYXRlKClcbiAgICBkYXRlLmhvdXIgPSBkLmdldEhvdXJzKClcbiAgICBkYXRlLm1pbnV0ZSA9IGQuZ2V0TWludXRlcygpXG4gICAgZGF0ZS5zZWNvbmQgPSBkLmdldFNlY29uZHMoKVxuICAgIGRhdGUubWlsbGlzZWNvbmQgPSBkLmdldE1pbGxpc2Vjb25kcygpXG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKG1hcC5ZWVlZICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUueWVhciA9IHBhcnNlSW50KG1hdGNoWyBtYXAuWVlZWSBdLCAxMClcbiAgICB9XG4gICAgZWxzZSBpZiAobWFwLllZICE9PSB2b2lkIDApIHtcbiAgICAgIGNvbnN0IHkgPSBwYXJzZUludChtYXRjaFsgbWFwLllZIF0sIDEwKVxuICAgICAgZGF0ZS55ZWFyID0geSA8IDAgPyB5IDogMjAwMCArIHlcbiAgICB9XG5cbiAgICBpZiAobWFwLk0gIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5tb250aCA9IHBhcnNlSW50KG1hdGNoWyBtYXAuTSBdLCAxMClcbiAgICAgIGlmIChkYXRlLm1vbnRoIDwgMSB8fCBkYXRlLm1vbnRoID4gMTIpIHtcbiAgICAgICAgcmV0dXJuIGRhdGVcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobWFwLk1NTSAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLm1vbnRoID0gbW9udGhzU2hvcnQuaW5kZXhPZihtYXRjaFsgbWFwLk1NTSBdKSArIDFcbiAgICB9XG4gICAgZWxzZSBpZiAobWFwLk1NTU0gIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5tb250aCA9IG1vbnRocy5pbmRleE9mKG1hdGNoWyBtYXAuTU1NTSBdKSArIDFcbiAgICB9XG5cbiAgICBpZiAobWFwLkQgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5kYXkgPSBwYXJzZUludChtYXRjaFsgbWFwLkQgXSwgMTApXG5cbiAgICAgIGlmIChkYXRlLnllYXIgPT09IG51bGwgfHwgZGF0ZS5tb250aCA9PT0gbnVsbCB8fCBkYXRlLmRheSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGVcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWF4RGF5ID0gY2FsZW5kYXIgIT09ICdwZXJzaWFuJ1xuICAgICAgICA/IChuZXcgRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIDApKS5nZXREYXRlKClcbiAgICAgICAgOiBqYWxhYWxpTW9udGhMZW5ndGgoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoKVxuXG4gICAgICBpZiAoZGF0ZS5kYXkgPiBtYXhEYXkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWFwLkggIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5ob3VyID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5IIF0sIDEwKSAlIDI0XG4gICAgfVxuICAgIGVsc2UgaWYgKG1hcC5oICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUuaG91ciA9IHBhcnNlSW50KG1hdGNoWyBtYXAuaCBdLCAxMCkgJSAxMlxuICAgICAgaWYgKFxuICAgICAgICAobWFwLkEgJiYgbWF0Y2hbIG1hcC5BIF0gPT09ICdQTScpXG4gICAgICAgIHx8IChtYXAuYSAmJiBtYXRjaFsgbWFwLmEgXSA9PT0gJ3BtJylcbiAgICAgICAgfHwgKG1hcC5hYSAmJiBtYXRjaFsgbWFwLmFhIF0gPT09ICdwLm0uJylcbiAgICAgICkge1xuICAgICAgICBkYXRlLmhvdXIgKz0gMTJcbiAgICAgIH1cbiAgICAgIGRhdGUuaG91ciA9IGRhdGUuaG91ciAlIDI0XG4gICAgfVxuXG4gICAgaWYgKG1hcC5tICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUubWludXRlID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5tIF0sIDEwKSAlIDYwXG4gICAgfVxuXG4gICAgaWYgKG1hcC5zICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUuc2Vjb25kID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5zIF0sIDEwKSAlIDYwXG4gICAgfVxuXG4gICAgaWYgKG1hcC5TICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUubWlsbGlzZWNvbmQgPSBwYXJzZUludChtYXRjaFsgbWFwLlMgXSwgMTApICogMTAgKiogKDMgLSBtYXRjaFsgbWFwLlMgXS5sZW5ndGgpXG4gICAgfVxuXG4gICAgaWYgKG1hcC5aICE9PSB2b2lkIDAgfHwgbWFwLlpaICE9PSB2b2lkIDApIHtcbiAgICAgIHR6U3RyaW5nID0gKG1hcC5aICE9PSB2b2lkIDAgPyBtYXRjaFsgbWFwLlogXS5yZXBsYWNlKCc6JywgJycpIDogbWF0Y2hbIG1hcC5aWiBdKVxuICAgICAgZGF0ZS50aW1lem9uZU9mZnNldCA9ICh0elN0cmluZ1sgMCBdID09PSAnKycgPyAtMSA6IDEpICogKDYwICogdHpTdHJpbmcuc2xpY2UoMSwgMykgKyAxICogdHpTdHJpbmcuc2xpY2UoMywgNSkpXG4gICAgfVxuICB9XG5cbiAgZGF0ZS5kYXRlSGFzaCA9IHBhZChkYXRlLnllYXIsIDYpICsgJy8nICsgcGFkKGRhdGUubW9udGgpICsgJy8nICsgcGFkKGRhdGUuZGF5KVxuICBkYXRlLnRpbWVIYXNoID0gcGFkKGRhdGUuaG91cikgKyAnOicgKyBwYWQoZGF0ZS5taW51dGUpICsgJzonICsgcGFkKGRhdGUuc2Vjb25kKSArIHR6U3RyaW5nXG5cbiAgcmV0dXJuIGRhdGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQgKGRhdGUpIHtcbiAgcmV0dXJuIHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJ1xuICAgID8gdHJ1ZVxuICAgIDogaXNOYU4oRGF0ZS5wYXJzZShkYXRlKSkgPT09IGZhbHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZERhdGUgKG1vZCwgdXRjKSB7XG4gIHJldHVybiBhZGp1c3REYXRlKG5ldyBEYXRlKCksIG1vZCwgdXRjKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrIChkYXRlKSB7XG4gIGNvbnN0IGRvdyA9IG5ldyBEYXRlKGRhdGUpLmdldERheSgpXG4gIHJldHVybiBkb3cgPT09IDAgPyA3IDogZG93XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrT2ZZZWFyIChkYXRlKSB7XG4gIC8vIFJlbW92ZSB0aW1lIGNvbXBvbmVudHMgb2YgZGF0ZVxuICBjb25zdCB0aHVyc2RheSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSlcblxuICAvLyBDaGFuZ2UgZGF0ZSB0byBUaHVyc2RheSBzYW1lIHdlZWtcbiAgdGh1cnNkYXkuc2V0RGF0ZSh0aHVyc2RheS5nZXREYXRlKCkgLSAoKHRodXJzZGF5LmdldERheSgpICsgNikgJSA3KSArIDMpXG5cbiAgLy8gVGFrZSBKYW51YXJ5IDR0aCBhcyBpdCBpcyBhbHdheXMgaW4gd2VlayAxIChzZWUgSVNPIDg2MDEpXG4gIGNvbnN0IGZpcnN0VGh1cnNkYXkgPSBuZXcgRGF0ZSh0aHVyc2RheS5nZXRGdWxsWWVhcigpLCAwLCA0KVxuXG4gIC8vIENoYW5nZSBkYXRlIHRvIFRodXJzZGF5IHNhbWUgd2Vla1xuICBmaXJzdFRodXJzZGF5LnNldERhdGUoZmlyc3RUaHVyc2RheS5nZXREYXRlKCkgLSAoKGZpcnN0VGh1cnNkYXkuZ2V0RGF5KCkgKyA2KSAlIDcpICsgMylcblxuICAvLyBDaGVjayBpZiBkYXlsaWdodC1zYXZpbmctdGltZS1zd2l0Y2ggb2NjdXJyZWQgYW5kIGNvcnJlY3QgZm9yIGl0XG4gIGNvbnN0IGRzID0gdGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIGZpcnN0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKVxuICB0aHVyc2RheS5zZXRIb3Vycyh0aHVyc2RheS5nZXRIb3VycygpIC0gZHMpXG5cbiAgLy8gTnVtYmVyIG9mIHdlZWtzIGJldHdlZW4gdGFyZ2V0IFRodXJzZGF5IGFuZCBmaXJzdCBUaHVyc2RheVxuICBjb25zdCB3ZWVrRGlmZiA9ICh0aHVyc2RheSAtIGZpcnN0VGh1cnNkYXkpIC8gKE1JTExJU0VDT05EU19JTl9EQVkgKiA3KVxuICByZXR1cm4gMSArIE1hdGguZmxvb3Iod2Vla0RpZmYpXG59XG5cbmZ1bmN0aW9uIGdldERheUlkZW50aWZpZXIgKGRhdGUpIHtcbiAgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKSAqIDEwMDAwICsgZGF0ZS5nZXRNb250aCgpICogMTAwICsgZGF0ZS5nZXREYXRlKClcbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZUlkZW50aWZpZXIgKGRhdGUsIG9ubHlEYXRlIC8qID0gZmFsc2UgKi8pIHtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKGRhdGUpXG4gIHJldHVybiBvbmx5RGF0ZSA9PT0gdHJ1ZSA/IGdldERheUlkZW50aWZpZXIoZCkgOiBkLmdldFRpbWUoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCZXR3ZWVuRGF0ZXMgKGRhdGUsIGZyb20sIHRvLCBvcHRzID0ge30pIHtcbiAgY29uc3RcbiAgICBkMSA9IGdldERhdGVJZGVudGlmaWVyKGZyb20sIG9wdHMub25seURhdGUpLFxuICAgIGQyID0gZ2V0RGF0ZUlkZW50aWZpZXIodG8sIG9wdHMub25seURhdGUpLFxuICAgIGN1ciA9IGdldERhdGVJZGVudGlmaWVyKGRhdGUsIG9wdHMub25seURhdGUpXG5cbiAgcmV0dXJuIChjdXIgPiBkMSB8fCAob3B0cy5pbmNsdXNpdmVGcm9tID09PSB0cnVlICYmIGN1ciA9PT0gZDEpKVxuICAgICYmIChjdXIgPCBkMiB8fCAob3B0cy5pbmNsdXNpdmVUbyA9PT0gdHJ1ZSAmJiBjdXIgPT09IGQyKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvRGF0ZSAoZGF0ZSwgbW9kKSB7XG4gIHJldHVybiBnZXRDaGFuZ2UoZGF0ZSwgbW9kLCAxKVxufVxuZXhwb3J0IGZ1bmN0aW9uIHN1YnRyYWN0RnJvbURhdGUgKGRhdGUsIG1vZCkge1xuICByZXR1cm4gZ2V0Q2hhbmdlKGRhdGUsIG1vZCwgLTEpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mRGF0ZSAoZGF0ZSwgdW5pdCwgdXRjKSB7XG4gIGNvbnN0XG4gICAgdCA9IG5ldyBEYXRlKGRhdGUpLFxuICAgIHByZWZpeCA9IGBzZXQkeyB1dGMgPT09IHRydWUgPyAnVVRDJyA6ICcnIH1gXG5cbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneWVhcnMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9TW9udGhgIF0oMClcbiAgICBjYXNlICdtb250aCc6XG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfURhdGVgIF0oMSlcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9SG91cnNgIF0oMClcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdob3Vycyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1NaW51dGVzYCBdKDApXG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfVNlY29uZHNgIF0oMClcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9TWlsbGlzZWNvbmRzYCBdKDApXG4gIH1cbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuZE9mRGF0ZSAoZGF0ZSwgdW5pdCwgdXRjKSB7XG4gIGNvbnN0XG4gICAgdCA9IG5ldyBEYXRlKGRhdGUpLFxuICAgIHByZWZpeCA9IGBzZXQkeyB1dGMgPT09IHRydWUgPyAnVVRDJyA6ICcnIH1gXG5cbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneWVhcnMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9TW9udGhgIF0oMTEpXG4gICAgY2FzZSAnbW9udGgnOlxuICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1EYXRlYCBdKGRheXNJbk1vbnRoKHQpKVxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Ib3Vyc2AgXSgyMylcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdob3Vycyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1NaW51dGVzYCBdKDU5KVxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1TZWNvbmRzYCBdKDU5KVxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1NaWxsaXNlY29uZHNgIF0oOTk5KVxuICB9XG4gIHJldHVybiB0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXhEYXRlIChkYXRlIC8qICwgLi4uYXJncyAqLykge1xuICBsZXQgdCA9IG5ldyBEYXRlKGRhdGUpXG4gIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkuZm9yRWFjaChkID0+IHtcbiAgICB0ID0gTWF0aC5tYXgodCwgbmV3IERhdGUoZCkpXG4gIH0pXG4gIHJldHVybiB0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaW5EYXRlIChkYXRlIC8qLCAuLi5hcmdzICovKSB7XG4gIGxldCB0ID0gbmV3IERhdGUoZGF0ZSlcbiAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKS5mb3JFYWNoKGQgPT4ge1xuICAgIHQgPSBNYXRoLm1pbih0LCBuZXcgRGF0ZShkKSlcbiAgfSlcbiAgcmV0dXJuIHRcbn1cblxuZnVuY3Rpb24gZ2V0RGlmZiAodCwgc3ViLCBpbnRlcnZhbCkge1xuICByZXR1cm4gKFxuICAgICh0LmdldFRpbWUoKSAtIHQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIE1JTExJU0VDT05EU19JTl9NSU5VVEUpXG4gICAgLSAoc3ViLmdldFRpbWUoKSAtIHN1Yi5nZXRUaW1lem9uZU9mZnNldCgpICogTUlMTElTRUNPTkRTX0lOX01JTlVURSlcbiAgKSAvIGludGVydmFsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRlRGlmZiAoZGF0ZSwgc3VidHJhY3QsIHVuaXQgPSAnZGF5cycpIHtcbiAgY29uc3RcbiAgICB0ID0gbmV3IERhdGUoZGF0ZSksXG4gICAgc3ViID0gbmV3IERhdGUoc3VidHJhY3QpXG5cbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgICAgcmV0dXJuICh0LmdldEZ1bGxZZWFyKCkgLSBzdWIuZ2V0RnVsbFllYXIoKSlcblxuICAgIGNhc2UgJ21vbnRocyc6XG4gICAgY2FzZSAnbW9udGgnOlxuICAgICAgcmV0dXJuICh0LmdldEZ1bGxZZWFyKCkgLSBzdWIuZ2V0RnVsbFllYXIoKSkgKiAxMiArIHQuZ2V0TW9udGgoKSAtIHN1Yi5nZXRNb250aCgpXG5cbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgcmV0dXJuIGdldERpZmYoc3RhcnRPZkRhdGUodCwgJ2RheScpLCBzdGFydE9mRGF0ZShzdWIsICdkYXknKSwgTUlMTElTRUNPTkRTX0lOX0RBWSlcblxuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICAgIHJldHVybiBnZXREaWZmKHN0YXJ0T2ZEYXRlKHQsICdob3VyJyksIHN0YXJ0T2ZEYXRlKHN1YiwgJ2hvdXInKSwgTUlMTElTRUNPTkRTX0lOX0hPVVIpXG5cbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgICAgcmV0dXJuIGdldERpZmYoc3RhcnRPZkRhdGUodCwgJ21pbnV0ZScpLCBzdGFydE9mRGF0ZShzdWIsICdtaW51dGUnKSwgTUlMTElTRUNPTkRTX0lOX01JTlVURSlcblxuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICByZXR1cm4gZ2V0RGlmZihzdGFydE9mRGF0ZSh0LCAnc2Vjb25kJyksIHN0YXJ0T2ZEYXRlKHN1YiwgJ3NlY29uZCcpLCAxMDAwKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlPZlllYXIgKGRhdGUpIHtcbiAgcmV0dXJuIGdldERhdGVEaWZmKGRhdGUsIHN0YXJ0T2ZEYXRlKGRhdGUsICd5ZWFyJyksICdkYXlzJykgKyAxXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmZlckRhdGVGb3JtYXQgKGRhdGUpIHtcbiAgcmV0dXJuIGlzRGF0ZShkYXRlKSA9PT0gdHJ1ZVxuICAgID8gJ2RhdGUnXG4gICAgOiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInID8gJ251bWJlcicgOiAnc3RyaW5nJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGVCZXR3ZWVuIChkYXRlLCBtaW4sIG1heCkge1xuICBjb25zdCB0ID0gbmV3IERhdGUoZGF0ZSlcblxuICBpZiAobWluKSB7XG4gICAgY29uc3QgbG93ID0gbmV3IERhdGUobWluKVxuICAgIGlmICh0IDwgbG93KSB7XG4gICAgICByZXR1cm4gbG93XG4gICAgfVxuICB9XG5cbiAgaWYgKG1heCkge1xuICAgIGNvbnN0IGhpZ2ggPSBuZXcgRGF0ZShtYXgpXG4gICAgaWYgKHQgPiBoaWdoKSB7XG4gICAgICByZXR1cm4gaGlnaFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVEYXRlIChkYXRlLCBkYXRlMiwgdW5pdCkge1xuICBjb25zdFxuICAgIHQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICBkID0gbmV3IERhdGUoZGF0ZTIpXG5cbiAgaWYgKHVuaXQgPT09IHZvaWQgMCkge1xuICAgIHJldHVybiB0LmdldFRpbWUoKSA9PT0gZC5nZXRUaW1lKClcbiAgfVxuXG4gIHN3aXRjaCAodW5pdCkge1xuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICBpZiAodC5nZXRTZWNvbmRzKCkgIT09IGQuZ2V0U2Vjb25kcygpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIGNhc2UgJ21pbnV0ZSc6IC8vIGludGVudGlvbmFsIGZhbGwtdGhyb3VnaFxuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgICAgaWYgKHQuZ2V0TWludXRlcygpICE9PSBkLmdldE1pbnV0ZXMoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICBjYXNlICdob3VyJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnaG91cnMnOlxuICAgICAgaWYgKHQuZ2V0SG91cnMoKSAhPT0gZC5nZXRIb3VycygpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIGNhc2UgJ2RheSc6IC8vIGludGVudGlvbmFsIGZhbGwtdGhyb3VnaFxuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgaWYgKHQuZ2V0RGF0ZSgpICE9PSBkLmdldERhdGUoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICBjYXNlICdtb250aCc6IC8vIGludGVudGlvbmFsIGZhbGwtdGhyb3VnaFxuICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICBpZiAodC5nZXRNb250aCgpICE9PSBkLmdldE1vbnRoKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgY2FzZSAneWVhcic6IC8vIGludGVudGlvbmFsIGZhbGwtdGhyb3VnaFxuICAgIGNhc2UgJ3llYXJzJzpcbiAgICAgIGlmICh0LmdldEZ1bGxZZWFyKCkgIT09IGQuZ2V0RnVsbFllYXIoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgZGF0ZSBpc1NhbWVEYXRlIHVua25vd24gdW5pdCAkeyB1bml0IH1gKVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRheXNJbk1vbnRoIChkYXRlKSB7XG4gIHJldHVybiAobmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkgKyAxLCAwKSkuZ2V0RGF0ZSgpXG59XG5cbmZ1bmN0aW9uIGdldE9yZGluYWwgKG4pIHtcbiAgaWYgKG4gPj0gMTEgJiYgbiA8PSAxMykge1xuICAgIHJldHVybiBgJHsgbiB9dGhgXG4gIH1cbiAgc3dpdGNoIChuICUgMTApIHtcbiAgICBjYXNlIDE6IHJldHVybiBgJHsgbiB9c3RgXG4gICAgY2FzZSAyOiByZXR1cm4gYCR7IG4gfW5kYFxuICAgIGNhc2UgMzogcmV0dXJuIGAkeyBuIH1yZGBcbiAgfVxuICByZXR1cm4gYCR7IG4gfXRoYFxufVxuXG5jb25zdCBmb3JtYXR0ZXIgPSB7XG4gIC8vIFllYXI6IDAwLCAwMSwgLi4uLCA5OVxuICBZWSAoZGF0ZSwgZGF0ZUxvY2FsZSwgZm9yY2VkWWVhcikge1xuICAgIC8vIHdvcmthcm91bmQgZm9yIDwgMTkwMCB3aXRoIG5ldyBEYXRlKClcbiAgICBjb25zdCB5ID0gdGhpcy5ZWVlZKGRhdGUsIGRhdGVMb2NhbGUsIGZvcmNlZFllYXIpICUgMTAwXG4gICAgcmV0dXJuIHkgPj0gMFxuICAgICAgPyBwYWQoeSlcbiAgICAgIDogJy0nICsgcGFkKE1hdGguYWJzKHkpKVxuICB9LFxuXG4gIC8vIFllYXI6IDE5MDAsIDE5MDEsIC4uLiwgMjA5OVxuICBZWVlZIChkYXRlLCBfZGF0ZUxvY2FsZSwgZm9yY2VkWWVhcikge1xuICAgIC8vIHdvcmthcm91bmQgZm9yIDwgMTkwMCB3aXRoIG5ldyBEYXRlKClcbiAgICByZXR1cm4gZm9yY2VkWWVhciAhPT0gdm9pZCAwICYmIGZvcmNlZFllYXIgIT09IG51bGxcbiAgICAgID8gZm9yY2VkWWVhclxuICAgICAgOiBkYXRlLmdldEZ1bGxZZWFyKClcbiAgfSxcblxuICAvLyBNb250aDogMSwgMiwgLi4uLCAxMlxuICBNIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKSArIDFcbiAgfSxcblxuICAvLyBNb250aDogMDEsIDAyLCAuLi4sIDEyXG4gIE1NIChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChkYXRlLmdldE1vbnRoKCkgKyAxKVxuICB9LFxuXG4gIC8vIE1vbnRoIFNob3J0IE5hbWU6IEphbiwgRmViLCAuLi5cbiAgTU1NIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIGRhdGVMb2NhbGUubW9udGhzU2hvcnRbIGRhdGUuZ2V0TW9udGgoKSBdXG4gIH0sXG5cbiAgLy8gTW9udGggTmFtZTogSmFudWFyeSwgRmVicnVhcnksIC4uLlxuICBNTU1NIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIGRhdGVMb2NhbGUubW9udGhzWyBkYXRlLmdldE1vbnRoKCkgXVxuICB9LFxuXG4gIC8vIFF1YXJ0ZXI6IDEsIDIsIDMsIDRcbiAgUSAoZGF0ZSkge1xuICAgIHJldHVybiBNYXRoLmNlaWwoKGRhdGUuZ2V0TW9udGgoKSArIDEpIC8gMylcbiAgfSxcblxuICAvLyBRdWFydGVyOiAxc3QsIDJuZCwgM3JkLCA0dGhcbiAgUW8gKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0T3JkaW5hbCh0aGlzLlEoZGF0ZSkpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIG1vbnRoOiAxLCAyLCAuLi4sIDMxXG4gIEQgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXRlKClcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDFzdCwgMm5kLCAuLi4sIDMxc3RcbiAgRG8gKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0T3JkaW5hbChkYXRlLmdldERhdGUoKSlcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDAxLCAwMiwgLi4uLCAzMVxuICBERCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZGF0ZS5nZXREYXRlKCkpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHllYXI6IDEsIDIsIC4uLiwgMzY2XG4gIERERCAoZGF0ZSkge1xuICAgIHJldHVybiBnZXREYXlPZlllYXIoZGF0ZSlcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMDAxLCAwMDIsIC4uLiwgMzY2XG4gIEREREQgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGdldERheU9mWWVhcihkYXRlKSwgMylcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogMCwgMSwgLi4uLCA2XG4gIGQgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXkoKVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiBTdSwgTW8sIC4uLlxuICBkZCAoZGF0ZSwgZGF0ZUxvY2FsZSkge1xuICAgIHJldHVybiB0aGlzLmRkZGQoZGF0ZSwgZGF0ZUxvY2FsZSkuc2xpY2UoMCwgMilcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogU3VuLCBNb24sIC4uLlxuICBkZGQgKGRhdGUsIGRhdGVMb2NhbGUpIHtcbiAgICByZXR1cm4gZGF0ZUxvY2FsZS5kYXlzU2hvcnRbIGRhdGUuZ2V0RGF5KCkgXVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiBTdW5kYXksIE1vbmRheSwgLi4uXG4gIGRkZGQgKGRhdGUsIGRhdGVMb2NhbGUpIHtcbiAgICByZXR1cm4gZGF0ZUxvY2FsZS5kYXlzWyBkYXRlLmdldERheSgpIF1cbiAgfSxcblxuICAvLyBEYXkgb2YgSVNPIHdlZWs6IDEsIDIsIC4uLiwgN1xuICBFIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RGF5KCkgfHwgN1xuICB9LFxuXG4gIC8vIFdlZWsgb2YgWWVhcjogMSAyIC4uLiA1MiA1M1xuICB3IChkYXRlKSB7XG4gICAgcmV0dXJuIGdldFdlZWtPZlllYXIoZGF0ZSlcbiAgfSxcblxuICAvLyBXZWVrIG9mIFllYXI6IDAxIDAyIC4uLiA1MiA1M1xuICB3dyAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZ2V0V2Vla09mWWVhcihkYXRlKSlcbiAgfSxcblxuICAvLyBIb3VyOiAwLCAxLCAuLi4gMjNcbiAgSCAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEhvdXJzKClcbiAgfSxcblxuICAvLyBIb3VyOiAwMCwgMDEsIC4uLiwgMjNcbiAgSEggKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0SG91cnMoKSlcbiAgfSxcblxuICAvLyBIb3VyOiAxLCAyLCAuLi4sIDEyXG4gIGggKGRhdGUpIHtcbiAgICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKVxuICAgIHJldHVybiBob3VycyA9PT0gMFxuICAgICAgPyAxMlxuICAgICAgOiAoaG91cnMgPiAxMiA/IGhvdXJzICUgMTIgOiBob3VycylcbiAgfSxcblxuICAvLyBIb3VyOiAwMSwgMDIsIC4uLiwgMTJcbiAgaGggKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKHRoaXMuaChkYXRlKSlcbiAgfSxcblxuICAvLyBNaW51dGU6IDAsIDEsIC4uLiwgNTlcbiAgbSAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1pbnV0ZXMoKVxuICB9LFxuXG4gIC8vIE1pbnV0ZTogMDAsIDAxLCAuLi4sIDU5XG4gIG1tIChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChkYXRlLmdldE1pbnV0ZXMoKSlcbiAgfSxcblxuICAvLyBTZWNvbmQ6IDAsIDEsIC4uLiwgNTlcbiAgcyAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFNlY29uZHMoKVxuICB9LFxuXG4gIC8vIFNlY29uZDogMDAsIDAxLCAuLi4sIDU5XG4gIHNzIChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChkYXRlLmdldFNlY29uZHMoKSlcbiAgfSxcblxuICAvLyAxLzEwIG9mIHNlY29uZDogMCwgMSwgLi4uLCA5XG4gIFMgKGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwKVxuICB9LFxuXG4gIC8vIDEvMTAwIG9mIHNlY29uZDogMDAsIDAxLCAuLi4sIDk5XG4gIFNTIChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChNYXRoLmZsb29yKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMCkpXG4gIH0sXG5cbiAgLy8gTWlsbGlzZWNvbmQ6IDAwMCwgMDAxLCAuLi4sIDk5OVxuICBTU1MgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCksIDMpXG4gIH0sXG5cbiAgLy8gTWVyaWRpZW06IEFNLCBQTVxuICBBIChkYXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuSChkYXRlKSA8IDEyID8gJ0FNJyA6ICdQTSdcbiAgfSxcblxuICAvLyBNZXJpZGllbTogYW0sIHBtXG4gIGEgKGRhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5IKGRhdGUpIDwgMTIgPyAnYW0nIDogJ3BtJ1xuICB9LFxuXG4gIC8vIE1lcmlkaWVtOiBhLm0uLCBwLm0uXG4gIGFhIChkYXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuSChkYXRlKSA8IDEyID8gJ2EubS4nIDogJ3AubS4nXG4gIH0sXG5cbiAgLy8gVGltZXpvbmU6IC0wMTowMCwgKzAwOjAwLCAuLi4gKzEyOjAwXG4gIFogKGRhdGUsIF9kYXRlTG9jYWxlLCBfZm9yY2VkWWVhciwgZm9yY2VkVGltZXpvbmVPZmZzZXQpIHtcbiAgICBjb25zdCB0ek9mZnNldCA9IGZvcmNlZFRpbWV6b25lT2Zmc2V0ID09PSB2b2lkIDAgfHwgZm9yY2VkVGltZXpvbmVPZmZzZXQgPT09IG51bGxcbiAgICAgID8gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpXG4gICAgICA6IGZvcmNlZFRpbWV6b25lT2Zmc2V0XG5cbiAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodHpPZmZzZXQsICc6JylcbiAgfSxcblxuICAvLyBUaW1lem9uZTogLTAxMDAsICswMDAwLCAuLi4gKzEyMDBcbiAgWlogKGRhdGUsIF9kYXRlTG9jYWxlLCBfZm9yY2VkWWVhciwgZm9yY2VkVGltZXpvbmVPZmZzZXQpIHtcbiAgICBjb25zdCB0ek9mZnNldCA9IGZvcmNlZFRpbWV6b25lT2Zmc2V0ID09PSB2b2lkIDAgfHwgZm9yY2VkVGltZXpvbmVPZmZzZXQgPT09IG51bGxcbiAgICAgID8gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpXG4gICAgICA6IGZvcmNlZFRpbWV6b25lT2Zmc2V0XG5cbiAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodHpPZmZzZXQpXG4gIH0sXG5cbiAgLy8gU2Vjb25kcyB0aW1lc3RhbXA6IDUxMjk2OTUyMFxuICBYIChkYXRlKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoZGF0ZS5nZXRUaW1lKCkgLyAxMDAwKVxuICB9LFxuXG4gIC8vIE1pbGxpc2Vjb25kcyB0aW1lc3RhbXA6IDUxMjk2OTUyMDkwMFxuICB4IChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUgKHZhbCwgbWFzaywgZGF0ZUxvY2FsZSwgX19mb3JjZWRZZWFyLCBfX2ZvcmNlZFRpbWV6b25lT2Zmc2V0KSB7XG4gIGlmIChcbiAgICAodmFsICE9PSAwICYmICF2YWwpXG4gICAgfHwgdmFsID09PSBJbmZpbml0eVxuICAgIHx8IHZhbCA9PT0gLUluZmluaXR5XG4gICkge1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHZhbClcblxuICBpZiAoaXNOYU4oZGF0ZSkpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChtYXNrID09PSB2b2lkIDApIHtcbiAgICBtYXNrID0gZGVmYXVsdE1hc2tcbiAgfVxuXG4gIGNvbnN0IGxvY2FsZSA9IGdldERhdGVMb2NhbGUoZGF0ZUxvY2FsZSwgbGFuZy5wcm9wcylcblxuICByZXR1cm4gbWFzay5yZXBsYWNlKFxuICAgIHRva2VuLFxuICAgIChtYXRjaCwgdGV4dCkgPT4gKFxuICAgICAgbWF0Y2ggaW4gZm9ybWF0dGVyXG4gICAgICAgID8gZm9ybWF0dGVyWyBtYXRjaCBdKGRhdGUsIGxvY2FsZSwgX19mb3JjZWRZZWFyLCBfX2ZvcmNlZFRpbWV6b25lT2Zmc2V0KVxuICAgICAgICA6ICh0ZXh0ID09PSB2b2lkIDAgPyBtYXRjaCA6IHRleHQuc3BsaXQoJ1xcXFxdJykuam9pbignXScpKVxuICAgIClcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUgKGRhdGUpIHtcbiAgcmV0dXJuIGlzRGF0ZShkYXRlKSA9PT0gdHJ1ZVxuICAgID8gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpXG4gICAgOiBkYXRlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNWYWxpZCxcbiAgZXh0cmFjdERhdGUsXG4gIGJ1aWxkRGF0ZSxcbiAgZ2V0RGF5T2ZXZWVrLFxuICBnZXRXZWVrT2ZZZWFyLFxuICBpc0JldHdlZW5EYXRlcyxcbiAgYWRkVG9EYXRlLFxuICBzdWJ0cmFjdEZyb21EYXRlLFxuICBhZGp1c3REYXRlLFxuICBzdGFydE9mRGF0ZSxcbiAgZW5kT2ZEYXRlLFxuICBnZXRNYXhEYXRlLFxuICBnZXRNaW5EYXRlLFxuICBnZXREYXRlRGlmZixcbiAgZ2V0RGF5T2ZZZWFyLFxuICBpbmZlckRhdGVGb3JtYXQsXG4gIGdldERhdGVCZXR3ZWVuLFxuICBpc1NhbWVEYXRlLFxuICBkYXlzSW5Nb250aCxcbiAgZm9ybWF0RGF0ZSxcbiAgY2xvbmVcbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cImNvbnN0cmFpbiBxLXBhLW1kXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwicm93IHEtY29sLWd1dHRlci1sZ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiBjb2wtbWQtOFwiPlxuICAgICAgICA8cS1jYXJkXG4gICAgICAgICAgdi1mb3I9XCJwb3N0IGluIHBvc3RzXCJcbiAgICAgICAgICA6a2V5PVwicG9zdC5pZFwiXG4gICAgICAgICAgY2xhc3M9XCJjYXJkLXBvc3QgcS1tYi1tZFwiXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIGJvcmRlcmVkXG4gICAgICAgID5cbiAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cbiAgICAgICAgICAgICAgPHEtYXZhdGFyPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9pbWcvYm95LWF2YXRhci5wbmdcIj5cbiAgICAgICAgICAgICAgPC9xLWF2YXRhcj5cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjbGFzcz1cInRleHQtYm9sZFwiPmFuc2VsbW9udGVpcm88L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICAgICAgICAgIHt7IHBvc3QubG9jYXRpb24gfX1cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgIDwvcS1pdGVtPlxuXG4gICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgICAgPHEtaW1nXG4gICAgICAgICAgICA6c3JjPVwicG9zdC5pbWFnZVVybFwiXG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgIDxkaXY+e3sgcG9zdC5jYXB0aW9uIH19PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtZ3JleVwiPnt7IHBvc3QuZGF0ZSB9fTwvZGl2PlxuICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgICAgPC9xLWNhcmQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNCBsYXJnZS1zY3JlZW4tb25seVwiPlxuICAgICAgICA8cS1pdGVtIGNsYXNzPVwiZml4ZWRcIj5cbiAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxuICAgICAgICAgICAgPHEtYXZhdGFyICBzaXplPVwiNDhweFwiPlxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vY2RuLnF1YXNhci5kZXYvaW1nL2JveS1hdmF0YXIucG5nXCI+XG4gICAgICAgICAgICA8L3EtYXZhdGFyPlxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNsYXNzPVwidGV4dC1ib2xkXCI+YW5zZWxtb250ZWlybzwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICAgICAgICBhbnNlbG1vbnRlaXJvXG4gICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICA8L3EtaXRlbT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG5cblxuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBkZWZpbmVDb21wb25lbnQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBkYXRlIH0gZnJvbSAncXVhc2FyJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAnUGFnZUhvbWUnLFxuXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJue1xuICAgICAgcG9zdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgIGNhcHRpb246ICdQb250ZSBHb2xkZW4gR2F0ZScsXG4gICAgICAgICAgZGF0ZTogMTU5MTc3NjY1NTU4NCxcbiAgICAgICAgICBsb2NhdGlvbjogJ0JlaXJhLCBNb8OnYW1iaXF1ZScsXG4gICAgICAgICAgaW1hZ2VVcmw6ICdodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9wYXJhbGxheDIuanBnJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgY2FwdGlvbjogJ1BvbnRlIEdvbGRlbiBHYXRlJyxcbiAgICAgICAgICBkYXRlOiAxNTkxNzc2NjU1NTg0LFxuICAgICAgICAgIGxvY2F0aW9uOiAnQmVpcmEsIE1vw6dhbWJpcXVlJyxcbiAgICAgICAgICBpbWFnZVVybDogJ2h0dHBzOi8vY2RuLnF1YXNhci5kZXYvaW1nL3BhcmFsbGF4Mi5qcGcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogMyxcbiAgICAgICAgICBjYXB0aW9uOiAnUG9udGUgR29sZGVuIEdhdGUnLFxuICAgICAgICAgIGRhdGU6IDE1OTE3NzY2NTU1ODQsXG4gICAgICAgICAgbG9jYXRpb246ICdCZWlyYSwgTW/Dp2FtYmlxdWUnLFxuICAgICAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9pbWcvcGFyYWxsYXgyLmpwZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiA0LFxuICAgICAgICAgIGNhcHRpb246ICdQb250ZSBHb2xkZW4gR2F0ZScsXG4gICAgICAgICAgZGF0ZTogMTU5MTc3NjY1NTU4NCxcbiAgICAgICAgICBsb2NhdGlvbjogJ0JlaXJhLCBNb8OnYW1iaXF1ZScsXG4gICAgICAgICAgaW1hZ2VVcmw6ICdodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9wYXJhbGxheDIuanBnJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuICBmaWx0ZXJzOiB7XG4gICAgbmljZURhdGUgKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZGF0ZS5mb3JtYXREYXRlKHZhbHVlLCAnWVlZWS1NTS1ERFRISDptbTpzcy5TU1NaJylcbiAgICB9XG4gIH1cbn0pXG48L3NjcmlwdD5cbjxzdHlsZSBsYW5nPVwic2Fzc1wiPlxuLmNhcmQtcG9zdFxuICAucS1pbWdcbiAgICBtaW4taGVpZ2h0OjIwMHB4XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbImRhdGUiLCJtb2QiLCJsYW5nIiwiZGF0ZTIiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7O0FBU0EsSUFBQSxVQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUVILFVBQVU7QUFBQSxJQUVWLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUVYLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFNBQVM7QUFBQSxFQUNWO0FBQUEsRUFFRCxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sWUFBWSxRQUFRLEtBQUs7QUFFL0IsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QixjQUNHLE1BQU0sUUFBUSxPQUFRLE1BQU0sVUFBVyxPQUN2QyxNQUFNLFlBQVksU0FBVSxNQUFNLDhCQUErQixPQUVsRSxNQUFNLFdBQVcsT0FDYixzQkFDQyxNQUFNLFlBQVksT0FBTyxxQkFBcUI7QUFBQSxJQUV0RDtBQUVELFVBQU0sZUFBZSxTQUFTLE1BQzVCLE1BQU0sV0FDRixFQUFFLFVBQVUsTUFBTSxTQUFVLElBQzVCLElBQ0w7QUFFRCxXQUFPLE1BQU07QUFDWCxZQUFNLE9BQU8sTUFBTSxTQUFTLFNBQ3hCLENBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLEtBQUksQ0FBRSxDQUFHLElBQ2xDO0FBRUosYUFBTyxFQUFFLE9BQU87QUFBQSxRQUNkLE9BQU8sUUFBUTtBQUFBLFFBQ2YsT0FBTyxVQUFVO0FBQUEsTUFDekIsR0FBUztBQUFBLFFBQ0QsRUFBRSxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxPQUFPLGFBQWE7QUFBQSxRQUNyQixHQUFFLGlCQUFpQixNQUFNLFNBQVMsSUFBSSxDQUFDO0FBQUEsTUFDaEQsQ0FBTztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0gsQ0FBQztBQ3hERCxJQUFBLGVBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Q7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QiwyQ0FDd0IsTUFBTSxXQUFXLFFBQVEsTUFBTSxTQUFTLFFBQVEsTUFBTSxjQUFjLE9BQU8sU0FBUyxZQUN6RyxNQUFNLFFBQVEsT0FBTyx3Q0FBd0Msc0JBQzdELE1BQU0sV0FBVyxPQUFPLDZCQUE2QixPQUNyRCxNQUFNLGNBQWMsT0FBTyxnQ0FBZ0MsT0FDM0QsTUFBTSxXQUFXLE9BQU8sNkJBQTZCO0FBQUEsSUFDekQ7QUFFRCxXQUFPLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxRQUFRLE1BQUssR0FBSSxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsRUFDckU7QUFDSCxDQUFDO0FDdkJELElBQUEsYUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxVQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsSUFDVCxRQUFRO0FBQUEsSUFDUixPQUFPLENBQUUsUUFBUSxNQUFRO0FBQUEsRUFDMUI7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxjQUFjLFNBQVMsTUFBTSxTQUFTLE1BQU0sT0FBTyxFQUFFLENBQUM7QUFFNUQsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QixtQkFDRyxNQUFNLGFBQWEsT0FBTywyQ0FBMkMsT0FDckUsTUFBTSxZQUFZLE9BQU8seUNBQXlDLE9BQ2xFLE1BQU0sV0FBVyxPQUFPLDJCQUEyQixPQUNuRCxZQUFZLFVBQVUsSUFBSSxjQUFjO0FBQUEsSUFDNUM7QUFFRCxVQUFNLFFBQVEsU0FBUyxNQUFNO0FBQzNCLGFBQU8sTUFBTSxVQUFVLFVBQVUsWUFBWSxRQUFRLElBQ2pEO0FBQUEsUUFDRSxVQUFVO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxzQkFBc0I7QUFBQSxRQUN0QixzQkFBc0IsWUFBWTtBQUFBLE1BQ25DLElBQ0Q7QUFBQSxJQUNWLENBQUs7QUFFRCxXQUFPLE1BQU0sRUFBRSxPQUFPO0FBQUEsTUFDcEIsT0FBTyxNQUFNO0FBQUEsTUFDYixPQUFPLFFBQVE7QUFBQSxJQUNyQixHQUFPLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBQSxFQUN4QjtBQUNILENBQUM7QUNoQ0QsSUFBQSxRQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUVILEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFFRCxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLElBRUQsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLElBQ1AsWUFBWTtBQUFBLElBRVosVUFBVSxDQUFFLFFBQVEsTUFBUTtBQUFBLElBRTVCLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxFQUNkO0FBQUEsRUFFRCxPQUFPLENBQUUsU0FBUyxPQUFTO0FBQUEsRUFFM0IsTUFBTyxPQUFPLEVBQUUsT0FBTyxLQUFJLEdBQUk7QUFDN0IsVUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFJLEVBQUEsSUFBSyxtQkFBb0I7QUFFOUMsVUFBTSxTQUFTLFFBQVEsT0FBTyxFQUFFO0FBQ2hDLFVBQU0sRUFBRSxTQUFTLFdBQVcsV0FBVyxTQUFTLGdCQUFpQixJQUFHLGNBQWU7QUFFbkYsVUFBTSxVQUFVLElBQUksSUFBSTtBQUN4QixVQUFNLGdCQUFnQixJQUFJLElBQUk7QUFFOUIsVUFBTSxlQUFlO0FBQUEsTUFBUyxNQUM1QixNQUFNLGNBQWMsUUFDZixRQUFRLFVBQVUsUUFDbEIsTUFBTSxRQUFRO0FBQUEsSUFDcEI7QUFFRCxVQUFNLGNBQWM7QUFBQSxNQUFTLE1BQzNCLE1BQU0sWUFBWSxRQUFRLGFBQWEsVUFBVTtBQUFBLElBQ2xEO0FBRUQsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QixvQ0FDRyxNQUFNLFVBQVUsT0FBTyxtQkFBbUIsT0FDMUMsT0FBTyxVQUFVLE9BQU8sa0JBQWtCLE9BRTNDLFFBQVEsVUFBVSxRQUFRLE1BQU0sV0FBVyxPQUN2QyxVQUFVLFFBRVIsTUFBTSxXQUFXLE9BQ2Isa0JBQW1CLE1BQU0sZ0JBQWdCLFNBQVMsSUFBSyxNQUFNLGdCQUFpQixPQUM5RSxPQUdULE1BQU0sWUFBWSxPQUFPLGNBQWMsT0FFeEMsWUFBWSxVQUFVLE9BQ2xCLCtDQUNHLE1BQU0sZ0JBQWdCLE9BQU8sdUJBQXVCLDhCQUNwRCxNQUFNLFlBQVksT0FBTyxpQ0FBaUMsTUFDN0Q7QUFBQSxJQUVQO0FBRUQsVUFBTSxRQUFRLFNBQVMsTUFBTTtBQUMzQixVQUFJLE1BQU0sZUFBZSxRQUFRO0FBQy9CLGVBQU87QUFBQSxNQUNSO0FBRUQsWUFBTSxNQUFNLEdBQUcsS0FBSyxRQUFRLE9BQU8sVUFBVTtBQUM3QyxhQUFPO0FBQUEsUUFDTCxDQUFFLFlBQVksTUFBUSxLQUFLLE1BQU0sYUFBYSxLQUFNO0FBQUEsTUFDckQ7QUFBQSxJQUNQLENBQUs7QUFFRCxhQUFTLFFBQVMsR0FBRztBQUNuQixVQUFJLFlBQVksVUFBVSxNQUFNO0FBQzlCLFlBQUksY0FBYyxVQUFVLE1BQU07QUFDaEMsY0FBSSxFQUFFLGNBQWMsUUFBUSxTQUFTLGtCQUFrQixRQUFRLE9BQU87QUFDcEUsMEJBQWMsTUFBTSxNQUFPO0FBQUEsVUFDNUIsV0FDUSxTQUFTLGtCQUFrQixjQUFjLE9BQU87QUFDdkQsb0JBQVEsTUFBTSxNQUFPO0FBQUEsVUFDdEI7QUFBQSxRQUNGO0FBRUQsd0JBQWdCLENBQUM7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFFRCxhQUFTLFFBQVMsR0FBRztBQUNuQixVQUFJLFlBQVksVUFBVSxRQUFRLFVBQVUsR0FBRyxFQUFFLE1BQU0sTUFBTTtBQUMzRCx1QkFBZSxDQUFDO0FBR2hCLFVBQUUsWUFBWTtBQUdkLGNBQU0sTUFBTSxJQUFJLFdBQVcsU0FBUyxDQUFDO0FBQ3JDLFlBQUksWUFBWTtBQUNoQixnQkFBUSxNQUFNLGNBQWMsR0FBRztBQUFBLE1BQ2hDO0FBRUQsV0FBSyxTQUFTLENBQUM7QUFBQSxJQUNoQjtBQUVELGFBQVMsYUFBYztBQUNyQixZQUFNLFFBQVEsWUFBWSxNQUFNLFNBQVMsQ0FBQSxDQUFFO0FBRTNDLGtCQUFZLFVBQVUsUUFBUSxNQUFNO0FBQUEsUUFDbEMsRUFBRSxPQUFPLEVBQUUsT0FBTyxrQkFBa0IsVUFBVSxJQUFJLEtBQUssZUFBZTtBQUFBLE1BQ3ZFO0FBRUQsYUFBTztBQUFBLElBQ1I7QUFFRCxXQUFPLE1BQU07QUFDWCxZQUFNLE9BQU87QUFBQSxRQUNYLEtBQUs7QUFBQSxRQUNMLE9BQU8sUUFBUTtBQUFBLFFBQ2YsT0FBTyxNQUFNO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTjtBQUFBLFFBQ0E7QUFBQSxNQUNEO0FBRUQsVUFBSSxZQUFZLFVBQVUsTUFBTTtBQUM5QixhQUFLLFdBQVcsTUFBTSxZQUFZO0FBQ2xDLGVBQU8sT0FBTyxNQUFNLFVBQVUsS0FBSztBQUFBLE1BQ3BDLFdBQ1EsYUFBYSxVQUFVLE1BQU07QUFDcEMsYUFBTSxtQkFBb0I7QUFBQSxNQUMzQjtBQUVELGFBQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSO0FBQUEsUUFDQSxXQUFZO0FBQUEsTUFDYjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0gsQ0FBQztBQzVKTSxNQUFNLGdCQUFnQjtBQUFBLEVBQzNCLE9BQU8sQ0FBRSxRQUFRLE1BQVE7QUFDM0I7QUFFZSxTQUFBLFNBQVUsT0FBTyxjQUFjO0FBRTVDLFNBQU8sU0FBUyxNQUFNO0FBQ3BCLFVBQU0sUUFBUTtBQUFBLE1BQ1osTUFBTSxVQUFVLGlCQUFpQixTQUFTLGFBQWEsUUFBUTtBQUFBLElBQ2hFO0FBRUQsV0FBTyxNQUFNLEtBQUssTUFBTSxRQUFRLFFBQVEsSUFDcEMsRUFBRSxlQUFlLEdBQUksTUFBTSxTQUFXLElBQ3RDO0FBQUEsRUFDUixDQUFHO0FBQ0g7QUNSQSxNQUFNLGVBQWUsS0FBSztBQUUxQixJQUFBLE9BQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBRUgsS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBRVAsS0FBSztBQUFBLElBQ0wsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLElBQ1YsZ0JBQWdCO0FBQUEsSUFFaEIsV0FBVztBQUFBLElBRVgsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUNELGVBQWU7QUFBQSxNQUNiLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFDRCxPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsTUFDWixNQUFNLENBQUUsUUFBUSxNQUFRO0FBQUEsTUFDeEIsU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUVELGdCQUFnQjtBQUFBLElBRWhCLEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFDRCxVQUFVO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLElBRUQsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBRVYsV0FBVztBQUFBLElBQ1gsY0FBYztBQUFBLElBQ2QsY0FBYztBQUFBLElBRWQsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLEVBQ2Q7QUFBQSxFQUVELE9BQU8sQ0FBRSxRQUFRLE9BQVM7QUFBQSxFQUUxQixNQUFPLE9BQU8sRUFBRSxPQUFPLEtBQUksR0FBSTtBQUM3QixVQUFNLGVBQWUsSUFBSSxNQUFNLFlBQVk7QUFDM0MsVUFBTSxhQUFhLFNBQVMsT0FBTyxZQUFZO0FBRS9DLFFBQUksWUFBWSxNQUFNLGNBQWM7QUFFcEMsVUFBTSxTQUFTO0FBQUEsTUFDYixJQUFJLElBQUk7QUFBQSxNQUNSLElBQUksa0JBQWlCLENBQUU7QUFBQSxJQUN4QjtBQUVELFVBQU0sV0FBVyxJQUFJLENBQUM7QUFFdEIsVUFBTSxZQUFZLElBQUksS0FBSztBQUMzQixVQUFNLFdBQVcsSUFBSSxLQUFLO0FBRTFCLFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIsZ0JBQWlCLE1BQU0saUJBQWlCLE9BQU8sUUFBUTtBQUFBLElBQ3hEO0FBRUQsVUFBTSxRQUFRLFNBQVMsT0FBTztBQUFBLE1BQzVCLE9BQU8sTUFBTTtBQUFBLE1BQ2IsUUFBUSxNQUFNO0FBQUEsSUFDcEIsRUFBTTtBQUVGLFVBQU0sV0FBVztBQUFBLE1BQVMsTUFDeEIsZ0JBQWlCLE1BQU0sYUFBYSxTQUFTLE1BQU0sV0FBVyxNQUFNLHVCQUM1QyxNQUFNLGlCQUFpQixPQUFPLFFBQVE7QUFBQSxJQUMvRDtBQUVELFVBQU0sV0FBVyxTQUFTLE9BQU87QUFBQSxNQUMvQixHQUFHLE1BQU07QUFBQSxNQUNULFdBQVcsTUFBTTtBQUFBLE1BQ2pCLGdCQUFnQixNQUFNO0FBQUEsSUFDNUIsRUFBTTtBQUVGLFVBQU0sTUFBTSxjQUFlLEdBQUUsUUFBUTtBQUVyQyxhQUFTLGdCQUFpQjtBQUN4QixhQUFPLE1BQU0sT0FBTyxNQUFNLFVBQVUsTUFBTSxRQUN0QztBQUFBLFFBQ0UsS0FBSyxNQUFNO0FBQUEsUUFDWCxRQUFRLE1BQU07QUFBQSxRQUNkLE9BQU8sTUFBTTtBQUFBLE1BQ2QsSUFDRDtBQUFBLElBQ0w7QUFFRCxhQUFTLG9CQUFxQjtBQUM1QixhQUFPLE1BQU0sbUJBQW1CLFNBQzVCLEVBQUUsS0FBSyxNQUFNLGVBQWdCLElBQzdCO0FBQUEsSUFDTDtBQUVELGFBQVMsU0FBVSxVQUFVO0FBQzNCLFVBQUksY0FBYyxNQUFNO0FBQ3RCLHFCQUFhLFNBQVM7QUFDdEIsb0JBQVk7QUFBQSxNQUNiO0FBRUQsZUFBUyxRQUFRO0FBRWpCLFVBQUksYUFBYSxNQUFNO0FBQ3JCLGtCQUFVLFFBQVE7QUFDbEIsZUFBUSxTQUFTLFFBQVEsR0FBSSxRQUFRLGtCQUFtQjtBQUFBLE1BQ3pELE9BQ0k7QUFDSCxrQkFBVSxRQUFRO0FBQUEsTUFDbkI7QUFFRCxhQUFRLFNBQVMsT0FBUSxRQUFRO0FBQUEsSUFDbEM7QUFFRCxhQUFTLE9BQVEsRUFBRSxVQUFVO0FBQzNCLFVBQUksZ0JBQWdCLE1BQU07QUFBRTtBQUFBLE1BQVE7QUFFcEMsVUFBSSxjQUFjLE1BQU07QUFDdEIscUJBQWEsU0FBUztBQUN0QixvQkFBWTtBQUFBLE1BQ2I7QUFFRCxtQkFBYSxRQUFRLE9BQU8sa0JBQWtCLElBQzFDLE1BQ0EsT0FBTyxlQUFlLE9BQU87QUFFakMsMEJBQW9CLFFBQVEsQ0FBQztBQUFBLElBQzlCO0FBRUQsYUFBUyxvQkFBcUIsUUFBUSxPQUFPO0FBRTNDLFVBQUksZ0JBQWdCLFFBQVEsVUFBVSxLQUFNO0FBQUU7QUFBQSxNQUFRO0FBRXRELFVBQUksT0FBTyxhQUFhLE1BQU07QUFDNUIsZ0JBQVEsTUFBTTtBQUFBLE1BQ2YsT0FDSTtBQUNILG9CQUFZLFdBQVcsTUFBTTtBQUMzQixzQkFBWTtBQUNaLDhCQUFvQixRQUFRLFFBQVEsQ0FBQztBQUFBLFFBQ3RDLEdBQUUsRUFBRTtBQUFBLE1BQ047QUFBQSxJQUNGO0FBRUQsYUFBUyxRQUFTLEtBQUs7QUFDckIsVUFBSSxnQkFBZ0IsTUFBTTtBQUFFO0FBQUEsTUFBUTtBQUVwQyxlQUFTLFFBQVEsU0FBUyxRQUFRO0FBQ2xDLGFBQVEsU0FBUyxPQUFRLFFBQVE7QUFDakMsZ0JBQVUsUUFBUTtBQUNsQixlQUFTLFFBQVE7QUFDakIsV0FBSyxRQUFRLElBQUksY0FBYyxJQUFJLEdBQUc7QUFBQSxJQUN2QztBQUVELGFBQVMsUUFBUyxLQUFLO0FBQ3JCLFVBQUksY0FBYyxNQUFNO0FBQ3RCLHFCQUFhLFNBQVM7QUFDdEIsb0JBQVk7QUFBQSxNQUNiO0FBRUQsZ0JBQVUsUUFBUTtBQUNsQixlQUFTLFFBQVE7QUFDakIsYUFBUSxTQUFTLE9BQVEsUUFBUTtBQUNqQyxhQUFRLFNBQVMsUUFBUSxHQUFJLFFBQVEsa0JBQW1CO0FBQ3hELFdBQUssU0FBUyxHQUFHO0FBQUEsSUFDbEI7QUFFRCxhQUFTLFNBQVUsT0FBTztBQUN4QixZQUFNLE1BQU0sT0FBUSxPQUFRO0FBRTVCLFlBQU0sT0FBTztBQUFBLFFBQ1gsS0FBSyxTQUFTO0FBQUEsUUFDZCxPQUFPLFNBQVM7QUFBQSxRQUNoQixPQUFPLFNBQVM7QUFBQSxRQUNoQixhQUFhLE1BQU07QUFBQSxRQUNuQixVQUFVLE1BQU07QUFBQSxRQUNoQixnQkFBZ0IsTUFBTTtBQUFBLFFBQ3RCLFFBQVEsTUFBTTtBQUFBLFFBQ2QsT0FBTyxNQUFNO0FBQUEsUUFDYixTQUFTLE1BQU07QUFBQSxRQUNmLGVBQWUsTUFBTTtBQUFBLFFBQ3JCLGVBQWU7QUFBQSxRQUNmLFdBQVcsTUFBTTtBQUFBLFFBQ2pCLEdBQUc7QUFBQSxNQUNKO0FBRUQsVUFBSSxTQUFTLFVBQVUsT0FBTztBQUM1QixhQUFLLFNBQVM7QUFDZCxlQUFPLE9BQU8sTUFBTSxFQUFFLFFBQVEsUUFBTyxDQUFFO0FBQUEsTUFDeEMsT0FDSTtBQUNILGFBQUssU0FBUztBQUFBLE1BQ2Y7QUFFRCxhQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0EsRUFBRSxPQUFPLGtDQUFrQyxLQUFLLFFBQVEsTUFBTztBQUFBLFFBQy9ELEVBQUUsT0FBTyxJQUFJO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFFRCxhQUFTLGFBQWM7QUFDckIsVUFBSSxVQUFVLFVBQVUsTUFBTTtBQUM1QixlQUFPLEVBQUUsT0FBTztBQUFBLFVBQ2QsS0FBSztBQUFBLFVBQ0wsT0FBTztBQUFBLFFBQ2pCLEdBQVcsTUFBTSxNQUFPLFNBQVMsVUFBVSxPQUFPLFVBQVUsVUFBVyxDQUFDO0FBQUEsTUFDakU7QUFFRCxhQUFPLEVBQUUsT0FBTztBQUFBLFFBQ2QsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLE1BQ1IsR0FDQyxNQUFNLFlBQVksU0FDZCxNQUFNLFFBQVMsSUFFYixNQUFNLGNBQWMsT0FDaEIsU0FDQTtBQUFBLFFBQ0UsRUFBRSxVQUFVO0FBQUEsVUFDVixPQUFPLE1BQU07QUFBQSxVQUNiLE1BQU0sTUFBTTtBQUFBLFFBQ2xDLENBQXFCO0FBQUEsTUFDRixDQUVYO0FBQUEsSUFDSDtBQUVtQztBQU03QjtBQUNILGlCQUFTLGNBQWEsQ0FBRTtBQUFBLE1BQ3pCO0FBRUQsc0JBQWdCLE1BQU07QUFDcEIsc0JBQWM7QUFFZCxZQUFJLGNBQWMsTUFBTTtBQUN0Qix1QkFBYSxTQUFTO0FBQ3RCLHNCQUFZO0FBQUEsUUFDYjtBQUFBLE1BQ1QsQ0FBTztBQUFBLElBQ0Y7QUFFRCxXQUFPLE1BQU07QUFDWCxZQUFNLFVBQVUsQ0FBRTtBQUVsQixVQUFJLFdBQVcsVUFBVSxNQUFNO0FBQzdCLGdCQUFRO0FBQUEsVUFDTixFQUFFLE9BQU8sRUFBRSxLQUFLLFVBQVUsT0FBTyxXQUFXLE9BQU87QUFBQSxRQUNwRDtBQUFBLE1BQ0Y7QUFFRCxVQUFJLFNBQVMsVUFBVSxNQUFNO0FBQzNCLFlBQUksT0FBUSxHQUFJLFVBQVUsTUFBTTtBQUM5QixrQkFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDO0FBQUEsUUFDekI7QUFFRCxZQUFJLE9BQVEsR0FBSSxVQUFVLE1BQU07QUFDOUIsa0JBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQztBQUFBLFFBQ3pCO0FBQUEsTUFDRjtBQUVELGNBQVE7QUFBQSxRQUNOLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQW9CLEdBQUksVUFBVTtBQUFBLE1BQ3pEO0FBRUQsYUFBTyxFQUFFLE9BQU87QUFBQSxRQUNkLE9BQU8sUUFBUTtBQUFBLFFBQ2YsT0FBTyxNQUFNO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixjQUFjLE1BQU07QUFBQSxNQUNyQixHQUFFLE9BQU87QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUNILENBQUM7QUM1U0QsSUFBQSxlQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFFRCxZQUFZO0FBQUEsRUFDYjtBQUFBLEVBRUQsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLG9DQUN3QixNQUFNLGVBQWUsT0FBTyxzQkFBc0I7QUFBQSxJQUMzRTtBQUVELFdBQU8sTUFBTSxFQUFFLE1BQU0sS0FBSyxFQUFFLE9BQU8sUUFBUSxTQUFTLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBQSxFQUN6RTtBQUNILENBQUM7QUNsQkQsSUFBQSxRQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUVILEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFFRCxRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsRUFDWDtBQUFBLEVBRUQsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUksRUFBQSxJQUFLLG1CQUFvQjtBQUM5QyxVQUFNLFNBQVMsUUFBUSxPQUFPLEVBQUU7QUFFaEMsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QixZQUNHLE9BQU8sVUFBVSxPQUFPLHlCQUF5QixPQUNqRCxNQUFNLGFBQWEsT0FBTyxzQkFBc0IsT0FDaEQsTUFBTSxXQUFXLE9BQU8scUNBQXFDLE9BQzdELE1BQU0sU0FBUyxPQUFPLDRCQUE0QjtBQUFBLElBQ3REO0FBRUQsV0FBTyxNQUFNLEVBQUUsTUFBTSxLQUFLLEVBQUUsT0FBTyxRQUFRLFNBQVMsTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUFBLEVBQ3pFO0FBQ0gsQ0FBQztBQ3hCTSxTQUFTLFdBQVksS0FBSztBQUMvQixTQUFPLElBQUksT0FBTyxDQUFDLEVBQUUsWUFBVyxJQUFLLElBQUksTUFBTSxDQUFDO0FBQ2xEO0FBdUJPLFNBQVMsSUFBSyxHQUFHLFNBQVMsR0FBRyxPQUFPLEtBQUs7QUFDOUMsTUFBSSxNQUFNLFVBQVUsTUFBTSxNQUFNO0FBQzlCLFdBQU87QUFBQSxFQUNSO0FBRUQsUUFBTSxNQUFNLEtBQUs7QUFDakIsU0FBTyxJQUFJLFVBQVUsU0FDakIsTUFDQSxJQUFJLE1BQU0sU0FBUyxJQUFJLFNBQVMsQ0FBQyxFQUFFLEtBQUssSUFBSSxJQUFJO0FBQ3REO0FDMUNBLE1BQU0sU0FBUztBQUFBLEVBQ2I7QUFBQSxFQUFLO0FBQUEsRUFBRztBQUFBLEVBQUk7QUFBQSxFQUFLO0FBQUEsRUFBSztBQUFBLEVBQUs7QUFBQSxFQUFLO0FBQUEsRUFBSztBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFDakQ7QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUNsRDtBQXdCQSxTQUFTLGtCQUFtQixJQUFJO0FBQzlCLFNBQU8sV0FBVyxFQUFFLE1BQU07QUFDNUI7QUFLTyxTQUFTLG1CQUFvQixJQUFJLElBQUk7QUFDMUMsTUFBSSxNQUFNO0FBQUcsV0FBTztBQUNwQixNQUFJLE1BQU07QUFBSSxXQUFPO0FBQ3JCLE1BQUksa0JBQWtCLEVBQUU7QUFBRyxXQUFPO0FBQ2xDLFNBQU87QUFDVDtBQVNBLFNBQVMsV0FBWSxJQUFJO0FBQ3ZCLFFBQU0sS0FBSyxPQUFPO0FBQ2xCLE1BQ0UsS0FBSyxPQUFRLElBQ2IsSUFDQSxNQUNBLE1BQ0EsR0FDQTtBQUVGLE1BQUksS0FBSyxNQUFNLE1BQU0sT0FBUSxLQUFLLElBQUs7QUFBRSxVQUFNLElBQUksTUFBTSwwQkFBMEIsRUFBRTtBQUFBLEVBQUc7QUFFeEYsT0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRztBQUMxQixTQUFLLE9BQVE7QUFDYixXQUFPLEtBQUs7QUFDWixRQUFJLEtBQUssSUFBSTtBQUFFO0FBQUEsSUFBTztBQUN0QixTQUFLO0FBQUEsRUFDTjtBQUNELE1BQUksS0FBSztBQUVULE1BQUksT0FBTyxJQUFJLEdBQUc7QUFBRSxRQUFJLElBQUksT0FBTyxJQUFJLE9BQU8sR0FBRyxFQUFFLElBQUk7QUFBQSxFQUFJO0FBQzNELFNBQU8sSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLElBQUksR0FBRyxDQUFDO0FBQ2hDLE1BQUksU0FBUyxJQUFJO0FBQ2YsV0FBTztBQUFBLEVBQ1I7QUFFRCxTQUFPO0FBQ1Q7QUF5TEEsU0FBUyxJQUFLLEdBQUcsR0FBRztBQUNsQixTQUFPLENBQUMsRUFBRSxJQUFJO0FBQ2hCO0FBRUEsU0FBUyxJQUFLLEdBQUcsR0FBRztBQUNsQixTQUFPLElBQUksQ0FBQyxFQUFFLElBQUksS0FBSztBQUN6QjtBQ3hRQSxNQUNFLHNCQUFzQixPQUN0Qix1QkFBdUIsTUFDdkIseUJBQXlCLEtBQ3pCLGNBQWMsNEJBQ2QsUUFBUSxtSUFDUixlQUFlLDZJQUNmLGFBQWEsQ0FBRTtBQUVqQixTQUFTLGFBQWMsTUFBTSxZQUFZO0FBQ3ZDLFFBQ0UsT0FBTyxNQUFNLFdBQVcsS0FBSyxLQUFLLEdBQUcsSUFBSSxLQUN6QyxNQUFNLE9BQU87QUFFZixNQUFJLFdBQVksU0FBVSxRQUFRO0FBQ2hDLFdBQU8sV0FBWTtBQUFBLEVBQ3BCO0FBRUQsUUFDRSxZQUFZLE1BQU0sV0FBVyxVQUFVLEtBQUssR0FBRyxJQUFJLEtBQ25ELFNBQVMsTUFBTSxXQUFXLE9BQU8sS0FBSyxHQUFHLElBQUksS0FDN0MsY0FBYyxNQUFNLFdBQVcsWUFBWSxLQUFLLEdBQUcsSUFBSTtBQUV6RCxRQUFNLE1BQU0sQ0FBRTtBQUNkLE1BQUksUUFBUTtBQUVaLFFBQU0sWUFBWSxLQUFLLFFBQVEsY0FBYyxXQUFTO0FBQ3BEO0FBQ0EsWUFBUTtBQUFBLFdBQ0Q7QUFDSCxZQUFJLEtBQUs7QUFDVCxlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksT0FBTztBQUNYLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksTUFBTTtBQUNWLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxPQUFPO0FBQ1gsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksS0FBSztBQUNULGVBQU87QUFBQSxXQUVKO0FBQ0gsZUFBTztBQUFBLFdBQ0o7QUFDSCxlQUFPO0FBQUEsV0FDSjtBQUFBLFdBQ0E7QUFBQSxXQUNBO0FBQ0gsZUFBTztBQUFBLFdBQ0o7QUFDSCxlQUFPO0FBQUEsV0FDSjtBQUFBLFdBQ0E7QUFDSCxlQUFPO0FBQUEsV0FDSjtBQUNILGVBQU87QUFBQSxXQUNKO0FBQ0gsZUFBTztBQUFBLFdBRUo7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksS0FBSztBQUNULGVBQU87QUFBQSxXQUVKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUE7QUFHUDtBQUNBLFlB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
