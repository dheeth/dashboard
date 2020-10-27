import React, { Component } from 'react';
import { statusIcon, statusColor } from '../../config';
import './appStatus.css';

interface AppStatusProps {
    status: string;
}

export class AppStatus extends Component<AppStatusProps>{
    render() {
        let status = this.props.status.toLocaleLowerCase().replace(/\s+/g, '');
        let isBG = (status === "progressing" || status === "notdeployed" || status === "hibernating");
        let iconClass = statusIcon[status] + " app-status__icon";
        let color = statusColor[status] || 'var(--N700)';
        return <React.Fragment>
            <svg className="app-status" preserveAspectRatio="none" viewBox="0 0 200 40">
                <line x1="0" y1="20" x2="200" y2="20" stroke={color} strokeWidth="1" />
                <line x1="0" y1="15" x2="0" y2="25" stroke={color} strokeWidth="1" />
                <line x1="200" y1="15" x2="200" y2="25" stroke={color} strokeWidth="1" />
            </svg>
            <div className={isBG ? "bg" : null}></div>
            <div className={iconClass}></div>
            <span className="app-status-cell__tooltip-body">{this.props.status}</span>
            <span className="app-status-cell__tooltip-arrow"></span>
        </React.Fragment>
    }
}