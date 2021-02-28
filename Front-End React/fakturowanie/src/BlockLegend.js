import React from 'react';
import './Style.css';

class BlockLegend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div >
                <div className="steps" style={{ backgroundColor: 'transparent', color: 'transparent' }}>
                    <div className="step active-step" style={{ backgroundColor: 'transparent', color: 'transparent' }}><span>1</span>
                    </div>
                    <div className="step" style={{ backgroundColor: 'transparent', color: 'transparent' }}><span>2</span></div>
                    <div className="step" style={{ backgroundColor: 'transparent', color: 'transparent' }}><span>3</span></div>
                </div>
                <div className="main-legend">List of <span className="red">invoices</span> </div>
            </div>
        )
    }
}
export default BlockLegend;