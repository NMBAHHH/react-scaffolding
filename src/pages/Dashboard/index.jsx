import React, { Component } from 'react';
import createG2 from 'g2-react';
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
            forceFit: true,
            width: 400,
            height: 250
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
            </div>
        );
    }
}

export default Index;