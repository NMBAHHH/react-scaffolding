import React, { Component } from 'react';
import * as styles from './index.less';
const ref = React.createRef();

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        this.chart1();
    }

    chart1() {
        // eslint-disable-next-line no-undef
        const Chart = new G2.Chart({
            container: 'c1',
            width: 600,
            height: 300,
            forceFit: true
        });
        const data = [
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
        ];
        Chart.source(data);
        Chart.areaStack().position('year*value').color('city');
        Chart.render();
    }

    render() {
        return (
            <div className={styles.dashboard}>
                <section>
                    <div className={styles.city}>各大城市营业额</div>
                    <div id="c1" ref={ref}></div>
                </section>
            </div>
        );
    }
}

export default Index;