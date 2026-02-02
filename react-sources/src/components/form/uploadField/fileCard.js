import React, { Component } from 'react';

class FileCard extends Component {
    humanFileSize(bytes) {
        var thresh = 1024;
        if(Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }
        var units = ['kB','MB','GB'];

        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while(Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1)+' '+units[u];
    }

    onDelete (id){
        if (id !== undefined) {
            this.props.deleteHandler(id);
        }
    }

    
    render() {
        const size = this.humanFileSize(this.props.size);
        const name = this.props.name;
        let message = this.props.statusMessage;
        let statusClassName = "";
        let completedPercentage = 25;

        if (this.props.status === true) {            
            if (this.props.completed === false) {
                statusClassName = "state-uploading";
                message = "Uploading";
            } else {                
                statusClassName = "state-completed";
                completedPercentage = 100;
            }
        } else {            
            statusClassName = "state-error";
            completedPercentage = 100;
        }        

        return (
            <div className={"upload-progress-card " + statusClassName}>
                <div className="upload-progress-card__in">
                    <div className="upload-progress-card__details">
                        <div className="upload-progress-card__filename">{name}</div>
                        <div className="upload-progress-card__size">{size}</div>
                        <button className="upload-progress-card__delete" onClick={this.onDelete.bind(this, this.props.id)} type="button" title="Delete image">X</button>
                    </div>
                </div>
                
                <div className="upload-progress-card__percentage-line"><span className="completed" style={{width:completedPercentage + '%'}}></span></div>
                <div className="upload-progress-card__status">{message}</div>
            </div>
        );
    }
}

export default FileCard;