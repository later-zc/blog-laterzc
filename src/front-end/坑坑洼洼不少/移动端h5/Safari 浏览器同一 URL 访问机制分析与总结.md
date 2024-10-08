# Safari 浏览器同一 URL 访问机制分析与总结

## 问题背景
::: info
在某 `kakaotalk` 平台上的 h5 项目中，存在防止用户通过复制项目 `url` 直接进入首页的需求，要求用户必须通过指定的入口（如特定的 `banner`）才能进入。
然而，在 `Safari` 浏览器中，当用户再次访问某个 `url` 时，浏览器会直接显示上次停留的页面，而不是重新加载页面。
这导致了项目中的入口控制机制失效，用户可以绕过指定的入口（如 `banner`）直接进入页面。
:::

## Safari 浏览器的 url 访问机制
- **页面缓存行为**：Safari 浏览器在某些情况下会对访问的页面进行缓存。如果用户在访问某个 `url` 的过程中，跳转到了其他页面（如同一域名下的其他页面），且最后停留在该页面，Safari 会记录这个状态。

- **重访相同 url 的行为**：当用户下次访问同一 `url` 时，如果 Safari 浏览器在后台运行且未被关闭，浏览器会直接显示上次访问时最终停留的页面，而不是从头加载该 `url` 。
这种机制是一种通过缓存优化的方式，以减少加载时间和数据消耗，但是在一定程度上影响了页面的入口控制。

- **浏览器退出行为的影响**：如果用户将 Safari 浏览器完全退出（即关闭浏览器应用），则下次再访问相同 `url` 时，Safari 会重新加载页面，而不会直接展示上次停留的页面。

## 解决方案思路
为了避免上述 Safari 的缓存机制导致用户绕过指定入口进入页面，可能需要考虑以下几种方案：

- **禁用缓存**：可以考虑在 `HTTP` 头中设置 `Cache-Control: no-store` 或类似指令，以避免 Safari 缓存页面，确保每次访问 `url` 时都从服务器获取最新内容。

- **增加入口校验逻辑**：在页面加载时，通过后端或前端逻辑判断用户是否通过指定入口访问，若不是则重定向至指定入口。

- **监控历史记录**：利用 `JavaScript` 监控用户的浏览历史，判断是否直接从其他页面跳转至目标页面，若是则采取相应措施。

## 结论与知识点
- **Safari 浏览器缓存机制**：Safari 会对访问的页面进行缓存，并在下次访问相同URL时直接显示上次停留的页面。这种行为可以加快加载速度，但会导致项目的入口控制机制失效。

- **关闭浏览器的影响**：如果完全关闭 Safari 浏览器，再次访问相同 `url` 时，Safari 通常会重新加载页面而不是使用缓存。

- 为确保用户通过指定路径访问，可以采取禁用缓存或增加入口校验逻辑等手段。

- 在开发和测试中，应充分考虑浏览器的特性和用户行为，避免因浏览器机制导致的逻辑漏洞。



