
# Don't usually mess with these
NMPATH ?= ./node_modules/.bin

setup:
	npm install .

test:
	gulp test

define release
	VERSION=`node -pe "require('./package.json').version"` && \
	NEXT_VERSION=`node -pe "require('semver').inc(\"$$VERSION\", '$(1)')"` && \
	node -e "\
		var j = require('./package.json');\
		j.version = \"$$NEXT_VERSION\";\
		var s = JSON.stringify(j, null, 2);\
		require('fs').writeFileSync('./package.json', s);" && \
	git commit -m "release $$NEXT_VERSION" -- package.json && \
	git tag "$$NEXT_VERSION" -m "release $$NEXT_VERSION"
endef

patch:
	@$(call release,patch)

minor:
	@$(call release,minor)

major:
	@$(call release,major)

.PHONY:	setup run
