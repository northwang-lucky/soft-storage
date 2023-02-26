# 开发者指南

本篇文章旨在帮助您了解整个 Soft Storage 的开发工作流，以便于更好地参与到共建之中。

## 目录结构

项目的基本目录结构如下所示：

<CodeScroll>

```toml
.
├── .github        # 存放GitHub工作流配置文件
├── .husky         # 存放git hooks
├── ...
├── config         # 存放项目基础配置文件（这里的配置都会被继承）
├── docs           # VuePress驱动的Markdown文档
├── packages       # 存放项目主要的源码包，发布到npm上
├── playground     # 示例Demo的源码包
├── scripts        # 构建/测试过程中会调用的脚本
├── ...
├── package.json
├── ...
```

</CodeScroll>

## 必要条件

- Node LTS
- PNPM >= 7.1.0

## 可选建议

使用 [Visual Studio Code](https://code.visualstudio.com/) 作为 Soft Storage 的代码编辑器，并安装以下扩展：

- Code Spell Checker
- ESLint
- markdownlint
- Prettier

## 分支命名规范

> 我们推荐使用这样方式来命名你的分支，当然，您也可以忽略我们的建议

您可以从以下的单词中，选择一个作为分支的命名空间：

- `feat`: 新特性
- `fix`: bug 修复
- `docs`: 文档修改
- `style`: 不影响代码含义的更改（空白、格式化、缺少分号等）
- `refactor`: 既没有修复 bug 也没有增加特性的代码更改
- `perf`: 改进代码以提高性能
- `test`: 添加遗漏的测试或修正现有的测试
- `build`: 影响构建系统或外部依赖的变更
- `ci`: 更改 CI 配置文件和脚本
- `chore`: 其他不修改 src 或测试文件的更改
- `revert`: 还原某次提交

然后，使用不多于 3 个能够明确表达分支中代码含义的单词，通过 `kebab-case` 的方式，与上一步所选的命名空间像这样组合：

<CodeScroll>

```text
feat/open-api
```

</CodeScroll>

## 目录与文件命名规范

除具有约定性质的配置文件外，我们建议您采用以下的基本格式来创建和命名目录与文件：

<CodeScroll>

```toml
.
├── open-api             # 目录使用kebab-case风格命名，作为一个模块
│   ├── index.ts         # 含有主要导出API的文件，命名为index，作为其他模块的导入源
│   ├── types.ts         # 含有主要导出类型的文件，命名为types，作为其他模块的导入源
│   └── useful-tools.ts  # 其他在该模块内部会用到的代码文件，也使用kebab-case风格命名
├── ...
```

</CodeScroll>

## 开发 SOP

标准的开发作业流程规范可参考下面的流程图：

![dev-sop](~@imgs/guide/other/developer-guide/dev-sop-zh.png)
