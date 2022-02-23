"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_table_1 = __importDefault(require("cli-table"));
const crypto_1 = __importDefault(require("crypto"));
exports.default = {
    isValidGfsPath(path) {
        return path && path.startsWith("gfs:/");
    },
    table(head) {
        const chars = {
            top: " ",
            "top-mid": "",
            "top-left": "",
            "top-right": "",
            bottom: " ",
            "bottom-mid": "",
            "bottom-left": "",
            "bottom-right": "",
            left: "",
            "left-mid": "",
            mid: "",
            "mid-mid": "",
            right: "",
            "right-mid": "",
            middle: "\t",
        };
        return new cli_table_1.default({
            head,
            chars,
        });
    },
    humanFileSize(size) {
        if (size == 0)
            return "0 B";
        let i = Math.floor(Math.log(size) / Math.log(1024));
        const sizeFmt = (size / Math.pow(1024, i)) * 1;
        return (`${sizeFmt.toFixed(2)} ` +
            ["B", "KB", "MB", "GB", "TB"][i]);
    },
    validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    },
    calcHash(somestring) {
        return crypto_1.default
            .createHash("md5")
            .update(somestring)
            .digest("hex")
            .toString();
    },
};
