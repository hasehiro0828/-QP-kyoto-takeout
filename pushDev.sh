#!/bin/sh
cd `dirname $0`

mv .clasp.json .clasp-renamed.json
mv .dev-clasp.json .clasp.json

clasp push

mv .clasp.json .dev-clasp.json
mv .clasp-renamed.json .clasp.json