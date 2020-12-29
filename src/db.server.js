/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Pool} from 'react-pg';

// Don't keep credentials in the source tree in a real app!
export const db = new Pool({
    connectionString: process.env.PG_URI
});
