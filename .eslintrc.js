module.exports = {
  extends: ["@s4p/eslint-config"],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 引入 android class
    Settings: false,
    Uri: false,
    Intent: false,
    Context: false,
    AudioManager: false,
    View: false,

    Rect: false,
    Point: false,
    UiObject: false,
    UiCollection: false,
    MatchTemplateOptions: false,

    // autojs 自带的
    auto: false,
    ui: false,
    threads: false,
    events: false,
    app: false,
    back: false,
    openAppSetting: false,
    images: false,
    device: false,
    open: false,
    press: false,
    click: false,
    swipe: false,
    gesture: false,
    home: false,

    context: false,
    importClass: false,
    android: false,

    sleep: false,
    currentPackage: false,
    currentActivity: false,
    setClip: false,
    getClip: false,
    toast: false,
    toastLog: false,
    waitForActivity: false,
    waitForPackage: false,
    exit: false,
    random: false,
    random: false,
    text: false,
    textContains: false,
    textStartsWith: false,
    textEndsWith: false,
    textMatches: false,
    desc: false,
    descContains: false,
    descStartsWith: false,
    descEndsWith: false,
    descMatches: false,
    id: false,
    idContains: false,
    idStartsWith: false,
    idEndsWith: false,
    idMatches: false,
    className: false,
    classNameContains: false,
    classNameStartsWith: false,
    classNameEndsWith: false,
    classNameMatches: false,
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
  },
  rules: {
    // 自定义你的规则
    "@typescript-eslint/unified-signatures": ["off"],
    "max-params": ["error", { max: 5 }],
  },
};
