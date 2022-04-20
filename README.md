# 答题内容
## 开发环境
* 语言：TypeScript
* 工具：Visual Studio Code
## 说明
* 题目理解
  > 1. 将有限个物品分成n行，每次仅对其中一行进行拿取，可以将物品分行摆放的状态作为一个一维数组，单元操作仅对数组中的一个元素进行减法计算；
  > 2. 当数组中所有元素相加等于0时，判定玩家输；
  > 3. 题目仅提出实现**符合游戏规则**即可，故假设游戏玩家存在失误的情况，因此不对“[尼姆博弈](https://baike.baidu.com/item/%E5%B0%BC%E5%A7%86%E5%8D%9A%E5%BC%88/58986985)”的必胜策略进行实现。

* 实现过程
  > 1. 将游戏实现为类，创建实例时初始化原始分组状态和物品信息；
  > 2. “拿”走物品后，计算游戏是否结束；
  > 3. 尽量使用更少的html代码。
***
* 测试结果
  > 游戏开始： [3,5,7]
PlayerA拿走第2行数量4 -> 操作成功，当前各行数量 [3,1,7]
PlayerB拿走第1行数量3 -> 操作成功，当前各行数量 [0,1,7]
PlayerA拿走第3行数量7 -> 操作成功，当前各行数量 [0,1,0]
PlayerB拿走第2行数量1 -> 操作成功，当前各行数量 [0,0,0] 你输了