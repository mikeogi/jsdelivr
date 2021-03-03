const formatPackageList = (list) => list.map((pkg) => ({
  name: pkg.name,
  description: pkg.description,
  homepage: pkg.homepage,
  licencse: pkg.licencse,
  userAvatar: owner?.avatar,
  userPage: owner?.link,
  deprecated: pkg.deprecated,
  popular: pkg.popular,
  latestVersion: pkg.version,
  modified: pkg.modified,
}))

export default formatPackageList
