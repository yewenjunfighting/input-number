
//判断val是否为数值类型
function isValueNumber(val){
    if(Number(val) != NaN) return true;
    else return false;
}

Vue.component('input-number', {
    template: `
        <div class="input-number">
                <input type="text" 
                    :value="currentValue"
                    @change="handleChange"
                    @keyup.up="handleUp"
                    @keyup.down="handleDown">
                <button @click="handleDown"
                        :disabled="currentValue <= min">-</button>
                <button @click="handleUp"
                        :disabled="currentValue >= max">+</button>
                <p>step:{{step}}</p>
        </div> 
    `,
    props: {
        max:{
            type: Number,
            default: 10
        },
        min:{
            type: Number,
            default: -10
        },
        value:{
            type: Number,
            default: 0
        },
        step: {
            type: Number,
            default: 1
        }
    },
    data: function(){
        return {
            currentValue : this.value 
        }
    },
    methods:{
        updateValue: function(val){ //对父组件传过来的值进行过滤
            if(val > this.max) val = this.max;
            else if(val < this.min) val = this.min;
            this.currentValue = val;
        },
        handleDown: function (){
            this.currentValue -= this.step;
            if(this.currentValue < this.min)   alert('超过最小值将置为最小值');
        },
        handleUp: function (){
            this.currentValue += this.step;
            if(this.currentValue > this.max)   alert('超过最大值将置为最大值');
        },
        handleChange: function(){
            //去除value首位的空格
            let val = event.target.value.trim();
            console.log(val);
            if(isValueNumber(val)){ //如果value是合法的Number类型
                val = Number(val);
                if(val > this.max) {
                    alert('超过最大值将置为最大值');
                    this.currentValue = this.max;
                    event.target.value = this.currentValue;
                } else if(val < this.min){
                    alert('超过最小值将置为最小值');
                    this.currentValue = this.min;
                    event.target.value = this.currentValue;
                }else {
                    this.currentValue = val;
                    event.target.value = this.currentValue;
                }
            }else{
                event.target.value = this.currentValue;
                console.log('没有触发监听函数');
            }
            console.log({
                max: this.max,
                min: this.min
            });
        }
    },
    watch: {
        currentValue: function(val){ // val是新的值
            this.$emit('input', val);//利用v-model改变value
        },
        value: function(val){
            this.updateValue(val);
        }
    },
    mounted: function (){
        this.updateValue(this.value);
    }
});