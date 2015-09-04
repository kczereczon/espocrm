/************************************************************************
 * This file is part of EspoCRM.
 *
 * EspoCRM - Open Source CRM application.
 * Copyright (C) 2014-2015 Yuri Kuznetsov, Taras Machyshyn, Oleksiy Avramenko
 * Website: http://www.espocrm.com
 *
 * EspoCRM is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * EspoCRM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with EspoCRM. If not, see http://www.gnu.org/licenses/.
 ************************************************************************/

Espo.define('Crm:Views.Opportunity.Detail', 'Views.Detail', function (Dep) {

    return Dep.extend({

        relatedAttributeMap: {
            'contacts': {
                'accountId': 'accountId',
                'accountName': 'accountName'
            },
        },

        relatedAttributeFunctions: {
            'documents': function () {
                var data = {};
                if (this.model.get('accountId')) {
                    data['accountsIds'] = [this.model.get('accountId')]
                }
                return data;
            }
        },

        selectRelatedFilters: {
            'contacts': {
                'account': function () {
                    if (this.model.get('accountId')) {
                        return {
                            field: 'accountId',
                            type: 'equals',
                            value: this.model.get('accountId'),
                            valueName: this.model.get('accountName')
                        };
                    }
                },
            },
            'documents': {
                'accounts': function () {
                    var accountId = this.model.get('accountId');
                    if (accountId) {
                        var nameHash = {};
                        nameHash[accountId] = this.model.get('accountName');
                        return {
                            field: 'accounts',
                            type: 'linkedWith',
                            value: [accountId],
                            nameHash: nameHash
                        };
                    }
                },

            },
        },

    });
});

