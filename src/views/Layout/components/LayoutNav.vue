<script setup>

</script>

<template>
  <div>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <template v-if="true">
                    <li>
                        <!-- 这种用法表示希望在用户点击链接时执行一段内联JavaScript代码 -->
                        <a href="javascript:;">
                            <i class="iconfont icon-user"></i>周杰伦
                        </a>
                    </li>
                    <li>
                        <el-popconfirm title="确定要退出吗?">
                            <template #reference>
                            <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                    <li><a href="javascript:;">我的订单</a></li>
                    <li><a href="javascript:;">会员中心</a></li>
                    <li><a href="javascript:;">关于我们</a></li>
                </template>
            </ul>
        </div>
    </nav>
  </div>
</template>


<style lang="scss" scoped>

.app-topnav{
    background: #333;
    ul{
        display: flex;
        height: 53px;
        justify-content: flex-end;
        align-items: center;
        li{
            a{
                padding: 0 15px;
                color: #cdcdcd;
                line-height: 1;
                // display: inline-block;
                i{
                    font-size: 14px;
                    margin-left: 2px;
                }
                // 表示对父类a的定义
                &:hover{
                    color: $xtxColor;
                }
            }

            ~li{
                a{
                    border-left: 2px solid #666;
                }
            }
        }

    }
}
</style>
