<template >
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a href="javascript:void(0)" class="price">Price
                        <svg class="icon icon-arrow-short">
                            <use xlink:href="#icon-arrow-short"></use>
                        </svg>
                    </a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd>
                                <a href="javascript:void(0)" @click="priceChecked='all'" :class="{'cur': priceChecked=='all'}">All</a>
                            </dd>
                            <dd v-for="(price, index) in priceFilter" :key="index">
                                <a href="javascript:void(0)" @click='priceChecked=index' :class="{'cur': priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li>
                                    <div class="pic">
                                        <a href="#"><img v-lazy="'static/1.jpg'" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">XX</div>
                                        <div class="price">999</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="pic">
                                        <a href="#"><img v-lazy="'static/2.jpg'" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">XX</div>
                                        <div class="price">1000</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="pic">
                                        <a href="#"><img v-lazy="'static/3.jpg'" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">XX</div>
                                        <div class="price">500</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="pic">
                                        <a href="#"><img v-lazy="'static/4.jpg'" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">XX</div>
                                        <div class="price">2499</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" @click="closePop" v-show="overlayFlag"></div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/login.css'
import './../assets/css/product.css'
import NavHeader from './../components/NavHeader'
import NavFooter from './../components/NavFooter'
import NavBread from './../components/NavBread'
export default {
    name: "",
    data(){
        return{
            priceFilter: [
                {
                    startPrice: '0.00',
                    endPrice: '500.00'
                },
                {
                    startPrice: '500.00',
                    endPrice: '1000.00'
                },
                {
                    startPrice: '1000.00',
                    endPrice: '2000.00'
                },
            ],
            priceChecked: 'all',
            filterBy: false,
            overlayFlag: false
        }
    },
    methods:{
        showFilterPop(){
            this.filterBy = true;
            this.overlayFlag = true;
        },
        closePop(){
            this.filterBy = false;
            this.overlayFlag = false;
        }
    },
    components:{
        NavHeader,
        NavFooter,
        NavBread
    }
}
</script>

<style scoped >

</style>