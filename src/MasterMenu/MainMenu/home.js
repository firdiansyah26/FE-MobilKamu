import React, { Component } from 'react';
import { getData, handleState } from '../../Action/home'
import { connect } from 'react-redux'
import { Input, Form, Row, Col, Radio, Icon, Button } from 'antd';
import BlockUi from "react-block-ui";
import '../../Style/home.scss'

var numeral = require('numeral');
let id = 0;

class home extends Component {

    state = {
        isShowCountry: true,
        isShowSquare: false,
        isValueRadio: 1,
        isNumberlistOfArray: null
    }

    componentWillMount() { }

    onChangeState(field, value) {
        let { handleState } = this.props
        handleState(field, value)
    }

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }
    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };


    handleChange(field, value) {
        this.setState({
            [field]: value
        })
        if (value == 1) this.setState({ isShowCountry: true, isShowSquare: false })
        else this.setState({ isShowCountry: false, isShowSquare: true })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { keys, names } = values;
                console.log('Received values of form: ', values);
                console.log('Merged values:', keys.map(key => parseInt(names[key])));
                this.state.isNumberlistOfArray = keys.map(key => names[key])

                console.log("isNumberlistOfArray", this.state.isNumberlistOfArray)
            }
        });
    };

    onEnterKeyPress(e) {
        let { homeState, getData } = this.props
        if (e.charCode == 13) {
            getData(homeState.search.country)
        }
    }

    render() {
        const { homeState } = this.props
        const { getFieldDecorator, getFieldValue } = this.props.form

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };

        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItemsDynamic = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Number of Array' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`names[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input number of array or delete this field.",
                        },
                    ],
                })(<Input placeholder="Number of Array" type={'number'} style={{ width: '60%', marginRight: 8 }} />)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));


        return (
            <BlockUi
                tag="div"
                blocking={homeState.loader}
                // blocking={true}
                message={
                    <span>
                        <div id="preloader">
                            <div id="loader"></div>
                        </div>
                    </span>
                }
            >
                <div>
                    <div className="header">
                        <div className="positionHeader">
                            <Radio.Group name="radiogroup" defaultValue={this.state.isValueRadio} value={this.state.isValueRadio} onChange={(e) => this.handleChange('isValueRadio', e.target.value)}>
                                <Radio value={1}>Show Search Country</Radio>
                                <Radio value={2}>Show Square Logic</Radio>
                            </Radio.Group>
                            <Row>
                                <Form onSubmit={this.handleSubmit}>
                                    <Col span={24}>
                                        {
                                            this.state.isShowCountry ?
                                                <Form.Item hasFeedback extra="Hit 'Enter' to search">
                                                    {getFieldDecorator('country', {
                                                        initialValue: homeState.search.country,
                                                        onChange: ((e) => this.onChangeState('country', e.currentTarget.value)),
                                                        rules: [
                                                            {
                                                                required: false,
                                                                message: '',
                                                            },
                                                        ],
                                                    })(<Input disabled={!this.state.isShowCountry} placeholder="Search Country" size="large" style={{ width: '50%' }} onKeyPress={(e) => this.onEnterKeyPress(e)} />)}
                                                </Form.Item>
                                                :
                                                null
                                        }
                                        {
                                            this.state.isShowSquare ?
                                                <div>
                                                    {formItemsDynamic}
                                                    <Form.Item {...formItemLayoutWithOutLabel}>
                                                        <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                                                            <Icon type="plus" /> Add field
                                                        </Button>
                                                    </Form.Item>
                                                    <Form.Item {...formItemLayoutWithOutLabel}>
                                                        <Button type="primary" htmlType="submit">
                                                            Submit
                                                        </Button>
                                                    </Form.Item>
                                                </div>
                                                :
                                                null
                                        }
                                    </Col>
                                </Form>
                            </Row>
                        </div>
                    </div>

                    <div className="content">
                        {
                            this.state.isShowCountry ?
                                homeState.listData.length != 0 ?
                                    homeState.listData.map((obj, idx) => {
                                        return (
                                            <div key={idx} className="content-item">
                                                <div style={{ margin: '30px' }}>
                                                    <div className="content-item-name">Country : {obj.name} [{obj.cioc}] <img src={obj.flag} style={{ width: "10%" }} /></div>
                                                    <br /><br />
                                                    <table className="table table-responsive">
                                                        <thead>
                                                            <tr>
                                                                <th>Description :</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Native Name</td>
                                                                <td>:</td>
                                                                <td>{obj.nativeName}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Numeric Code</td>
                                                                <td>:</td>
                                                                <td>{obj.numericCode}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Population</td>
                                                                <td>:</td>
                                                                <td>{numeral(obj.population).format('0,0')} People(s)</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Region</td>
                                                                <td>:</td>
                                                                <td>{obj.region}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Sub Region</td>
                                                                <td>:</td>
                                                                <td>{obj.subregion}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Alpha 2 Code</td>
                                                                <td>:</td>
                                                                <td>{obj.alpha2Code}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Alpha 3 Code</td>
                                                                <td>:</td>
                                                                <td>{obj.alpha3Code}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Area</td>
                                                                <td>:</td>
                                                                <td>{obj.area}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Capital</td>
                                                                <td>:</td>
                                                                <td>{obj.capital}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Demonym</td>
                                                                <td>:</td>
                                                                <td>{obj.demonym}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Gini</td>
                                                                <td>:</td>
                                                                <td>{obj.gini}</td>
                                                            </tr>
                                                            {/* LIST */}
                                                            <tr>
                                                                <td>Top Level Domain</td>
                                                                <td>:</td>
                                                                <td>{obj.topLevelDomain.map((obj2, idx2) => {
                                                                    return (
                                                                        <div>
                                                                            {obj2}<br />
                                                                        </div>
                                                                    )
                                                                })}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Spelling</td>
                                                                <td>:</td>
                                                                <td>{obj.altSpellings.map((obj2, idx2) => {
                                                                    return (
                                                                        <div>
                                                                            {obj2}<br />
                                                                        </div>
                                                                    )
                                                                })}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Borders</td>
                                                                <td>:</td>
                                                                <td>{obj.borders.map((obj2, idx2) => {
                                                                    return (
                                                                        <div>
                                                                            {obj2}<br />
                                                                        </div>
                                                                    )
                                                                })}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Calling Codes</td>
                                                                <td>:</td>
                                                                <td>{obj.callingCodes.map((obj2, idx2) => {
                                                                    return (
                                                                        <div>
                                                                            {obj2}<br />
                                                                        </div>
                                                                    )
                                                                })}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Currency</td>
                                                                <td>:</td>
                                                                <td>{obj.currencies.map((obj2, idx2) => {
                                                                    return (
                                                                        <div>
                                                                            {obj2.code} | {obj2.name} | {obj2.symbol}<br />
                                                                        </div>
                                                                    )
                                                                })}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Language</td>
                                                                <td>:</td>
                                                                <td>{obj.languages.map((obj2, idx2) => {
                                                                    return (
                                                                        <div>
                                                                            {obj2.name} | {obj2.nativeName}<br />
                                                                        </div>
                                                                    )
                                                                })}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Latitude Longitude</td>
                                                                <td>:</td>
                                                                <td>{obj.latlng.map((obj2, idx2) => {
                                                                    return (
                                                                        <div>
                                                                            {obj2}<br />
                                                                        </div>
                                                                    )
                                                                })}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Regional Block</td>
                                                                <td>:</td>
                                                                <td>{obj.regionalBlocs.map((obj2, idx2) => {
                                                                    return (
                                                                        <div>
                                                                            {obj2.acronym} = {obj2.name}<br />
                                                                        </div>
                                                                    )
                                                                })}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Time Zone</td>
                                                                <td>:</td>
                                                                <td>{obj.timezones.map((obj2, idx2) => {
                                                                    return (
                                                                        <div>
                                                                            {obj2}<br />
                                                                        </div>
                                                                    )
                                                                })}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    null
                                :
                                <div>
                                    <table style={{ width: "-webkit-fill-available", height: "100px" }}>
                                        <tbody>
                                            <tr>
                                                {
                                                    this.state.isNumberlistOfArray != null ?
                                                        this.state.isNumberlistOfArray.map((obj1, idx) => {
                                                            let _rowspan = 0
                                                            let obj = "" + obj1
                                                            _rowspan = obj.replace('-', '')

                                                            if (obj < "0") {
                                                                return (
                                                                    <React.Fragment>
                                                                        <td style={{ backgroundColor: "red" }} rowSpan={_rowspan} key={idx}></td>
                                                                    </React.Fragment>
                                                                )
                                                            }
                                                            else if (obj == "0") {
                                                                return (
                                                                    <React.Fragment>
                                                                        <td rowSpan={_rowspan} key={idx} style={{ backgroundColor: "white" }}></td>
                                                                    </React.Fragment>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <React.Fragment>
                                                                        <td style={{ backgroundColor: "green" }} rowSpan={_rowspan} key={idx}></td>
                                                                    </React.Fragment>
                                                                )
                                                            }
                                                        })
                                                        :
                                                        null
                                                }
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                        }
                    </div>
                </div>
            </BlockUi >
        )
    }
}


const mapStateToProps = (state) => ({
    homeState: state.homeState
})

const mapDispatchToProps = {
    getData,
    handleState
}

const WrappedFormWIthSubmissionButton = Form.create({ name: 'dynamic_form_item' })(home);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedFormWIthSubmissionButton);