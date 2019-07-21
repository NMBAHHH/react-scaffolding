import React, { Component } from 'react';
import createG2 from 'g2-react';
import { Stat } from 'g2';
import './index.less';
const Chart = createG2(chart => {
    chart.col('year', {
        type: 'linear',
        tickInterval: 100,
        alias: '年份'
    });
    chart.areaStack().position('year*value').color('city');
    chart.render();
});

const data2 = [
    {name: '打单', value: 56.33 },
    {name: '订单', value: 24.03},
    {name: '合单', value: 10.38}
];

const Chart2 = createG2(chart => {
    chart.coord('theta', {
        radius: 0.8 // 设置饼图的大小
    });
    chart.legend('name', {
        position: 'bottom',
        itemWrap: true,
        formatter: function(val) {
            for(let i = 0, len = data2.length; i < len; i++) {
                let obj = data2[i];
                if (obj.name === val) {
                    return val + ': ' + obj.value + '%';
                }
            }
        }
    });
    chart.tooltip({
        title: null,
        map: {
            value: 'value'
        }
    });
    chart.intervalStack()
        .position(Stat.summary.percent('value'))
        .color('name')
        .label('name*..percent',function(name, percent){
            percent = (percent * 100).toFixed(2) + '%';
            return name + ' ' + percent;
        });
    chart.render();
});

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {city: '北京', year: '1750', value: 502},
                {city: '北京', year: '1800', value: 635},
                {city: '北京', year: '1850', value: 809},
                {city: '北京', year: '1900', value: 947},
                {city: '北京', year: '1950', value: 1402},
                {city: '北京', year: '1999', value: 3634},
                {city: '北京', year: '2050', value: 5268},
                {city: '上海', year: '1750', value: 106},
                {city: '上海', year: '1800', value: 107},
                {city: '上海', year: '1850', value: 111},
                {city: '上海', year: '1900', value: 133},
                {city: '上海', year: '1950', value: 221},
                {city: '上海', year: '1999', value: 767},
                {city: '上海', year: '2050', value: 1766},
                {city: '深圳', year: '1750', value: 163},
                {city: '深圳', year: '1800', value: 203},
                {city: '深圳', year: '1850', value: 276},
                {city: '深圳', year: '1900', value: 408},
                {city: '深圳', year: '1950', value: 547},
                {city: '深圳', year: '1999', value: 729},
                {city: '深圳', year: '2050', value: 628},
                {city: '广州', year: '1750', value: 200},
                {city: '广州', year: '1800', value: 200},
                {city: '广州', year: '1850', value: 200},
                {city: '广州', year: '1900', value: 300},
                {city: '广州', year: '1950', value: 230},
                {city: '广州', year: '1999', value: 300},
                {city: '广州', year: '2050', value: 460}
            ],

            data2: [
                {name: '打单', value: 56.33 },
                {name: '订单', value: 24.03},
                {name: '合单', value: 10.38}
            ],
            forceFit: true,
            width: 400,
            height: 250,
            forceFit2: true,
            width2: 400,
            height2: 450
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="dashboard">
                <section>
                    <div className="city">各大城市营业额</div>
                    <Chart
                        data={this.state.data}
                        width={this.state.width}
                        height={this.state.height}
                        forceFit={this.state.forceFit}
                    />
                </section>
                <section>
                    <div className="city">订单分类</div>
                    <Chart2
                        data={this.state.data2}
                        width={this.state.width2}
                        height={this.state.height2}
                        forceFit={this.state.forceFit2}
                    />
                </section>
            </div>
        );
    }
}

export default Index;