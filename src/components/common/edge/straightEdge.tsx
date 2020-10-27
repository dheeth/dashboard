import * as React from 'react';
import { nodeColors } from './colors';

export interface SizeStoreType {
    nodeHeight: number;
    nodeWidth: number;
    strokeWidth: number;
    borderRadius: number;
    circleRadius: number;
    distanceA: number;
    distanceB: number;
    distanceC: number;
}

interface EdgeProps {
    startNode: {
        x: number;
        y: number;
        id: string;
    };
    endNode: {
        x: number;
        y: number;
        id: string;
    };
    text: string;
    onClickEdge: (event: any) => void;
    nodeSizes: SizeStoreType
}

class Edge extends React.Component <EdgeProps>{
    
    getLineDots() {
        return {
            lineStartX: this.props.startNode.x + this.props.nodeSizes.nodeWidth,
            lineStartY: this.props.startNode.y + this.props.nodeSizes.nodeHeight/2,
            lineEndX: this.props.endNode.x,
            lineEndY: this.props.endNode.y + this.props.nodeSizes.nodeHeight/2
        }
    }

    getPathEquation() {
        let {lineStartX, lineStartY, lineEndX, lineEndY} = this.getLineDots();
        return `M${lineStartX}, ${lineStartY} L ${lineEndX} ${lineEndY}`;
    }

    getArrowEquation() {
        let {lineStartX, lineStartY, lineEndX, lineEndY} = this.getLineDots();
        // (m*x2 + n*x1)/(m+n)
        let midPointX = (lineStartX + 9*lineEndX)/10;
        let midPointY = (lineStartY + 9*lineEndY)/10;
        
        let slope = (lineEndY - lineStartY)/(lineEndX - lineStartX);
        let complimentrySlope = 0;
        let constant = 0;
        let complementryConstant = 0;
        let sqrtMPlusOne = 0;
        let sqrtCMPlusOne = 0;
        let pointAX = 0;
        let pointAY = 0;
        let pointBX = 0;
        let pointBY = 0;
        let pointCX = 0;
        let pointCY = 0;
        let pointDX = 0;
        let pointDY = 0;

        if(lineEndX < lineStartX){
            return;
        }

        if(lineEndX - lineStartX == 0) {
            complimentrySlope = 0;
            sqrtCMPlusOne = Math.sqrt(1 + complimentrySlope*complimentrySlope);
            
            pointAX = midPointX;
            pointAY = midPointY + this.props.nodeSizes.distanceA;
            pointBX = midPointX;
            pointBY = midPointY + this.props.nodeSizes.distanceB;

            complementryConstant = pointBY;

            pointCX = pointBX - (this.props.nodeSizes.distanceC/sqrtCMPlusOne);
            pointCY = pointCX*complimentrySlope + complementryConstant;
            pointDX = pointBX + (this.props.nodeSizes.distanceC/sqrtCMPlusOne);
            pointDY = pointDX*complimentrySlope + complementryConstant;
                
        }
        else {
            if(slope != 0) {
                complimentrySlope = (-1)/slope;
                constant = lineEndY - slope*lineEndX;
                sqrtMPlusOne = Math.sqrt(1 + slope*slope);
                sqrtCMPlusOne = Math.sqrt(1 + complimentrySlope*complimentrySlope);
                
                pointAX = midPointX - (this.props.nodeSizes.distanceA/sqrtMPlusOne);
                pointAY = pointAX*slope + constant;
                pointBX = midPointX - (this.props.nodeSizes.distanceB/sqrtMPlusOne);
                pointBY = pointBX*slope + constant;

                complementryConstant = pointBY - complimentrySlope*pointBX;

                pointCX = pointBX - (this.props.nodeSizes.distanceC/sqrtCMPlusOne);
                pointCY = pointCX*complimentrySlope + complementryConstant;
                pointDX = pointBX + (this.props.nodeSizes.distanceC/sqrtCMPlusOne);
                pointDY = pointDX*complimentrySlope + complementryConstant;
            }
            else {
                constant = lineEndY;
                sqrtMPlusOne = Math.sqrt(1 + slope*slope);
                
                pointAX = midPointX - (this.props.nodeSizes.distanceA/sqrtMPlusOne);
                pointAY = pointAX*slope + constant;
                pointBX = midPointX - (this.props.nodeSizes.distanceB/sqrtMPlusOne);
                pointBY = pointBX*slope + constant;


                pointCX = pointBX;
                pointCY = pointBY + this.props.nodeSizes.distanceC;
                pointDX = pointBX;
                pointDY = pointBY - this.props.nodeSizes.distanceC;
            }
        }

        return `M${midPointX} ${midPointY} L ${pointCX} ${pointCY} L ${pointAX} ${pointAY} L ${pointDX} ${pointDY} Z`;
    }

    renderEdgeText() {
        if(this.props.text) {
            let {lineStartX, lineStartY, lineEndX, lineEndY} = this.getLineDots();
            let xPathId = `path-${this.props.startNode.id}-${this.props.endNode.id}`;
            let componentString = `<textPath xlink:href="#${xPathId}" startOffset="25%" stroke="#232323">${this.props.text}</textPath>`;
            return <text dy="-5" dangerouslySetInnerHTML={{__html: `${componentString}`}}></text>
        }
        else {
            return null;
        }
    }
    
    render() {
        return <g onClick={this.props.onClickEdge} className="edge-group">
            <path id={`path-${this.props.startNode.id}-${this.props.endNode.id}`} className="color-path" d={this.getPathEquation()} fill="transparent" stroke={nodeColors.strokeColor} strokeWidth={this.props.nodeSizes.strokeWidth} />
            <path d={this.getArrowEquation()} fill={nodeColors.strokeColor} />
            {this.renderEdgeText()}
        </g>
    }
}










