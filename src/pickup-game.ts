/**
 * 物品接口
 * @interface PickUpGame
 * @member {string} name 物品名称
 * @member {string} [unit] 单位
 */
interface PugItem {
    name: string,
    unit?: string
}

// 牙签
const toothpick = {name: '牙签', unit: '根'} as PugItem

/**
 * 游戏类
 * @class PickUpGame
 * @constructor
 */
class PickUpGame {
    // 物品
    readonly item: PugItem
    // 当前物品摆放组
    itemGroup: Array<number>
    preCalculated: boolean = false
    /**
     * 构造函数
     * @method constructor
     * @for PickUpGame
     * @param {Array<number>} group 初始化物品摆放组，不传则默认[3, 5, 7]
     * @param {T} [itemInfo] 物品信息，不传默认为牙签
     */
    constructor(group: Array<number> = [3, 5, 7], itemInfo?: PugItem) {
        this.itemGroup = group
        this.item = itemInfo ?? toothpick
    }
    /**
     * 拿走物品
     * @method pick
     * @for PickUpGame
     * @param {number} row 拿第几行
     * @param {number} take 拿多少
     * @return {[boolean, boolean, Array<number>, string]} 动作结果元组 [操作成功标志, 是否结束, 当前状态, 信息]
     */
    pick(row: number, take: number): [boolean, boolean, Array<number>, string] {
        try {
            if(take <= 0) // 拿走0时
                throw '至少拿走一' + this.item.unit ?? '个'
            if(row >= this.itemGroup.length || row < 0) // 选取了不存在的行
                throw '不存在的行'
            if(take > this.itemGroup[row]) // 数量超出
                throw `这一行已经没有这么多${this.item.name}了`

            this.itemGroup[row] -= take // 对应行减掉对应数量

            const ended = this.checkEnded() // 是否结束
            let message: string = ended ? '你输了' : ''
            return [true, ended, this.itemGroup, message]
        }
        catch(err) {
            // 异常时操作成功标志置为false
            return [false, false, this.itemGroup, err as string]
        }
    }
    checkEnded() {
        /** 
         * 不用累加，当数组中存在大于0的数则游戏未结束
         * return this.itemGroup.reduce((t, n) => { return t + n }) === 0
         * TODO 若是假设游戏双方都不会失误，则是尼姆博弈问题
         */ 
        return this.itemGroup.findIndex(x => { return x > 0 }) < 0;
    }
}

// 公用方法
/**
 * 打印到页面
 * @method print
 * @param {any} result 打印内容，若不为字符串，则按[,,]格式打印
 * @param {string} [prefix] 前缀，可选
 * @param {string} [suffix] 后缀，可选，不传则默认换行
 */
function print(result: any, prefix?: string, suffix?: string) {
    if(typeof result === 'string')
        document.writeln(`${prefix ?? ''}${result}${suffix ?? '<br>'}`)
    else
        document.writeln(`${prefix ?? ''}[${result.join(',')}]${suffix ?? '<br>'}`)
}

function playerTookAndPrint(player: string, row: number, take: number) {
    let result = puGame.pick(row, take)
    print(`拿走第${row + 1}行数量${take} -> 操作${result[0] ? '成功' : '失败'}，当前各行数量`,  `Player${player}`, '')
    print(result[2], '', '')
    print(result[3])
}

// 主流程开始
let puGame = new PickUpGame([3, 5, 7])
print('游戏开始：', '', '')
print(puGame.itemGroup)
playerTookAndPrint('A', 1, 4)
playerTookAndPrint('B', 0, 3)
playerTookAndPrint('A', 2, 7)
playerTookAndPrint('B', 1, 1)