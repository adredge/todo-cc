'use strict'

const childProcess = require('child_process')

module.exports = class LocalService {
    constructor(serviceFilePath) {
        this.serviceProcess = null;
        this.serviceFilePath = serviceFilePath
    }

    start() {
        if (this.serviceProcess){
            return Promise.reject(new Error('The service is already running!'))
        }

        return LocalService.startChildProcess(this.serviceFilePath)
            .then(process => this.serviceProcess = process)
    }

    kill() {
        return LocalService.killChildProcess(this.serviceProcess)
            .then(() => this.serviceProcess = null)
    }

    static startChildProcess(serviceFilePath) {
        return new Promise((resolve, reject) => {
            const child = childProcess.fork(serviceFilePath)

            child.on('message', m => {
                if (m === 'service_started')
                    resolve(child)
            })

            child.on('error', err => {
               console.error('LOCAL-SERVICE: failed to start child process!', err)
               reject(err)
            })
            
            child.on('close', (code) => {
               if (code)
                   console.error('LOCAL-SERVICE: exited with code', code)
            })
        })
    }

    static killChildProcess(proc) {
        if (!proc) return Promise.resolve()
            
        return new Promise((resolve) => {
            proc.once('close', code => resolve(code))
            proc.kill('SIGINT')
        })
    }
}