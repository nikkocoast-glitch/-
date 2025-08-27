使用说明（手机运行与打包APK）

一、放置PDF
- 将你的七夕贺卡PDF命名为 qixi_card.pdf，放到项目根目录（与 index.html 同级）。
- PDF内文字已在页面上显示为：“宝宝，七夕节快乐！”，PDF会在弹层里内嵌尝试显示；如果浏览器不支持，会提示并可点击“打开PDF贺卡”。

二、在手机上直接运行
- 把整个项目放到任意静态服务器（例如用 VSCode 扩展 Live Server，或任何网站空间）。
- 用手机浏览器访问该地址。
- 点击浏览器菜单“添加到主屏幕”，可作为独立App使用（PWA，支持离线）。

三、生成可安装的APK（无需写原生代码）
方法A：PWABuilder（推荐）
1) 部署到HTTPS地址（确保能访问 index.html、manifest.webmanifest、sw.js、chest_closed.png、chest_open_glow.png、qixi_card.pdf）。
2) 打开 https://www.pwabuilder.com/ 输入你的网址，修复提示项（图标、SW等我们已配置好）。
3) 点击“Build My PWA”选择“Android”，下载生成包，按向导用 Android Studio 构建APK。

方法B：Bubblewrap（TWA）
1) npm i -g @bubblewrap/cli
2) bubblewrap init --manifest=https://你的域名/manifest.webmanifest
3) bubblewrap build，然后用 Android Studio 生成APK。

方法C：Capacitor（WebView封装）
1) 初始化：npm create @capacitor/app@latest（选择“Existing web app”，指向本项目目录）
2) 添加Android：npx cap add android
3) 同步资源：npx cap copy
4) 用 Android Studio 打开 android/ 并构建APK。

四、图标
- 在根目录放置 icon-192.png 与 icon-512.png（透明背景，简洁图标）。否则安装后可能使用默认图标。

五、调试提示
- 如果“打开PDF”无反应，可能是浏览器拦截了弹窗或无PDF查看器。可用系统浏览器打开，或安装PDF阅读器。
- 如需离线查看PDF，请将 qixi_card.pdf 也加入缓存：在 sw.js 的 ASSETS 数组中加入 "./qixi_card.pdf"（已默认添加）。

六、自定义
- 修改文案：index.html 中 .card-text。
- 动效时长：styles.css 中 @keyframes 和 app.js 的 setTimeout。
- 颜色尽量保持简洁，已适配移动端触控与独立运行。

- 
