const formatPackageList = (list) => list.map((pkg) => ({
  name: pkg.name,
  description: pkg.description,
  homepage: pkg.homepage,
  license: pkg.license,
  userAvatar: pkg.owner?.avatar,
  userName: pkg.owner?.name,
  userPage: pkg.owner?.link,
  deprecated: pkg.deprecated,
  popular: pkg.popular,
  latestVersion: pkg.version,
  modified: pkg.modified,
}))

export default formatPackageList
