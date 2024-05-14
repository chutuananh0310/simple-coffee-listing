import React, { Component, Fragment } from 'react';
import PageHeader from '../../components/Layout/PageHeader/PageHeader';

class NotFountPage extends Component {
    render() {
        return (
            <Fragment>
                <PageHeader pageTitle="Không tìm thấy trang" />
            </Fragment>
        );
    }
}

export default NotFountPage;
