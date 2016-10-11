/**
 * Collects system information:
 * - local IP
 * - current user (name, ID and group)
 *
 * @author Maxim Korshunov <korshunov.m.e@gmail.com>
 */

var sh = require('shelljs');

module.exports = {
    getLocalNetworkIP: function () {
        return sh.exec("hostname -I | awk '{print $1}'", {silent: true}).stdout.trim();
    },
    currentUser: (function(){
        var name = undefined;
        var id = undefined;
        var primaryGroupName = undefined;
        var primaryGroupId = undefined;

        var getName = function() {
            if (!name) {
                name = sh.exec("echo ${USER}", {silent: true}).stdout.trim();
            }
            return name;
        };

        var getId = function() {
            if (!id) {
                id = sh.exec("echo ${UID}", {silent: true, shell: '/bin/bash'}).stdout.trim();
            }
            return id;
        };

        var getPrimaryGroupName = function() {
            if (!primaryGroupName) {
                primaryGroupName = sh.exec("id -g -n ${USER}", {silent: true, shell: '/bin/bash'}).stdout.trim();
            }
            return primaryGroupName;
        };

        var getPrimaryGroupId = function() {
            if (!primaryGroupId) {
                return sh.exec("getent group " + getPrimaryGroupName() + " | awk -F: '{printf \"%d\", $3}'", {silent: true, shell: '/bin/bash'}).stdout.trim();
            }
            return primaryGroupId;
        };

        return {
            getName: getName,
            getId: getId,
            getPrimaryGroupName: getPrimaryGroupName,
            getPrimaryGroupId: getPrimaryGroupId
        }
    })()
};