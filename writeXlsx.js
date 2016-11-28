var XLSX, _write_file, _;
var __bind = function(fn, me) {
    return function() {
        return fn.apply(me, arguments);
    };
};
XLSX = require('xlsx');
_ = require('lodash');

_write_file = function(path, sheets) {
    var datenum, sheet_from_array_of_arrays, wb;
    datenum = __bind(function(v, date1904) {
        var epoch;
        if (date1904) {
            v += 1462;
        }
        epoch = Date.parse(v);
        return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
    }, this);
    sheet_from_array_of_arrays = __bind(function(data, opts) {
        var C, R, cell, cell_ref, range, ws, _ref, _ref2;
        ws = {};
        range = {
            s: {
                c: 10000000,
                r: 10000000
            },
            e: {
                c: 0,
                r: 0
            }
        };
        for (R = 0, _ref = data.length; 0 <= _ref ? R < _ref : R > _ref; 0 <= _ref ? R++ : R--) {
            for (C = 0, _ref2 = data[R].length; 0 <= _ref2 ? C < _ref2 : C > _ref2; 0 <= _ref2 ? C++ : C--) {
                if (range.s.r > R) {
                    range.s.r = R;
                }
                if (range.s.c > C) {
                    range.s.c = C;
                }
                if (range.e.r < R) {
                    range.e.r = R;
                }
                if (range.e.c < C) {
                    range.e.c = C;
                }
                cell = {
                    v: data[R][C]
                };
                if (cell.v === null) {
                    continue;
                }
                cell_ref = XLSX.utils.encode_cell({
                    c: C,
                    r: R
                });
                if (_.isNumber(cell.v)) {
                    cell.t = 'n';
                } else if (_.isBoolean(cell.v)) {
                    cell.t = 'b';
                } else if (_.isDate(cell.v)) {
                    cell.t = 'n';
                    cell.z = XLSX.SSF._table[14];
                    cell.v = datenum(cell.v);
                } else {
                    cell.t = 's';
                }
                ws[cell_ref] = cell;
            }
        }
        if (range.s.c < 10000000) {
            ws['!ref'] = XLSX.utils.encode_range(range);
        }
        return ws;
    }, this);
    wb = {
        SheetNames: [],
        Sheets: {}
    };
    _.each(sheets, function(sheet) {
        wb.SheetNames.push(sheet.name);
        return wb.Sheets[sheet.name] = sheet_from_array_of_arrays(sheet.data);
    });
    return XLSX.writeFile(wb, path);
};
module.exports = _write_file;





