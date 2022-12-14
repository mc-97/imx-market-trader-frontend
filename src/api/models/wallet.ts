/* tslint:disable */
/* eslint-disable */
/**
 * IMX Market Trader
 * IMX Market Trader backend API
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Mnemonic } from './mnemonic';
/**
 * 
 * @export
 * @interface Wallet
 */
export interface Wallet {
    /**
     * 
     * @type {string}
     * @memberof Wallet
     */
    _id: string;
    /**
     * 
     * @type {string}
     * @memberof Wallet
     */
    address: string;
    /**
     * 
     * @type {string}
     * @memberof Wallet
     */
    l2Address?: string;
    /**
     * 
     * @type {string}
     * @memberof Wallet
     */
    publicKey?: string;
    /**
     * 
     * @type {string}
     * @memberof Wallet
     */
    privateKey?: string;
    /**
     * 
     * @type {Mnemonic}
     * @memberof Wallet
     */
    mnemonic?: Mnemonic;
    /**
     * 
     * @type {string}
     * @memberof Wallet
     */
    balance: string;
    /**
     * 
     * @type {string}
     * @memberof Wallet
     */
    registered?: string;
}
