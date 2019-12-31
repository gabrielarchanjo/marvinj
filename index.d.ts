// Type definitions for MarvinJ
// Project: (http://marvinj.org/)
// Definitions by: Rare Bear Soft <https://rarebearsoft>

/**
 * @name Marvin
 * @description processing library
 * @usage
 * ```typescript
 * import { Marvin, MarvinImage } from "@rarebearsoft/marvin";
 *
 * let marv = new MarvinImage();
 * ```
 */
declare var marvinjs = require('index');

exports.Marvin = marvinjs.Marvin;
exports.MarvinImage = marvinjs.MarvinImage;
