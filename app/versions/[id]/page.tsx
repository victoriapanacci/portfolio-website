import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { VersionFive } from '@/components/versions/VersionFive'
import { VersionFour } from '@/components/versions/VersionFour'
import { VersionOne } from '@/components/versions/VersionOne'
import { VersionSwitcher } from '@/components/versions/VersionSwitcher'
import { VersionThree } from '@/components/versions/VersionThree'
import { VersionTwo } from '@/components/versions/VersionTwo'
import { getVersion, versions } from '@/components/versions/versionData'

export function generateStaticParams() {
  return versions.map((v) => ({ id: v.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const meta = getVersion(id)
  if (!meta) return { title: 'Layout version' }
  return {
    title: `${meta.name} — layout exploration`,
    description: meta.approach,
  }
}

const layouts: Record<string, () => React.ReactElement> = {
  '1': VersionOne,
  '2': VersionTwo,
  '3': VersionThree,
  '4': VersionFour,
  '5': VersionFive,
}

export default async function VersionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const Layout = layouts[id]
  if (!Layout) notFound()

  return (
    <>
      <Layout />
      <VersionSwitcher />
    </>
  )
}
