#!/usr/bin/env node

var chai = require('chai');
var info = require('./../system-info.js');

describe('System-info', function() {

    it('Local IP is correct', function() {
        var ip = info.getLocalNetworkIP();

        chai.expect(ip).to.match(new RegExp('(\\d{1,3}\\.){3}\\d{1,3}'));
    });

    it('User name is not empty', function() {
        var name = info.currentUser.getName();

        chai.expect(name).to.not.empty;
    });

});
