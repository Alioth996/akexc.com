---
title: git关联多个远程仓库
date: 2023-02-16
tags: [前端, 团队合作, git]
top_img: false
keywords: [前端, 团队合作, git]
categories: [Web开发]
---

### 本地 `git` 仓库 关联多个 `remote`

众所周知 `github` 经常出现抽风的现象, 因而使用 `gitlab` 进行代码托管. 但我的需求是本地 `pull`和`push` 可以同步到 `github`和`gitlab`. 以下两种方法均可实现同时关联多个 `remote` 仓库.

---

### 方法一

`git remote -v` 查看本地已关联的远程仓库

```bash
$ git remote -v
origin  https://github.com/Alioth996/txt-reader.git (fetch)
origin  https://github.com/Alioth996/txt-reader.git (push)
```

**`git remote add <name> <url>`添加一个远程仓库 `name` 值请确保唯一性,方便区分**

```bash
$ git remote add gitlab git@gitlab.com:alioth-code/txt-reader.git
```

**查看远程仓库列表,关联成功**

```bash
$ git remote -v
gitlab  git@gitlab.com:alioth-code/txt-reader.git (fetch)
gitlab  git@gitlab.com:alioth-code/txt-reader.git (push)
origin  https://github.com/Alioth996/txt-reader.git (fetch)
origin  https://github.com/Alioth996/txt-reader.git (push)
```

**push 到指定的远程仓库**

```bash
$ git push origin master
$ git push gitlab master
```

**从指定的远程仓库 pull**

```bash
$ git pull origin master
$ git pull gitlab master
```

---

### 方法二：本地 `push`和`pull` 自动同步到多个 `remote `

在方法一中, 每次 `push` 或 `pull` 都需手动指定远程仓库,显得比较麻烦.我仅仅需要一次操作同步至 `github` 和 `gitlab` 即可,并不需要特别指定远程仓库. 这时候就可以仓库迁移进行远程同步

**`git remote set-url --add <name> <url>` 为当前仓库添加额外的远程地址**

```bash
$ git remote set-url --add origin git@gitlab.com:alioth-code/txt-reader.git
```

**查看已添加的远程地址**

```bash
$ git remote -v
origin  https://github.com/Alioth996/txt-reader.git (fetch)
origin  https://github.com/Alioth996/txt-reader.git (push)
origin  git@gitlab.com:alioth-code/txt-reader.git (push)
```

添加多个远程地址后, 本地 `pull` 或者 `push` 时会对已添加的远程地址起作用.

---

### 总结

**方便选择方法二严谨选择方法一**
