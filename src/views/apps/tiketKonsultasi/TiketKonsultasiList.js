import BcTiketKonsultasi from "src/components/apps/tiketKonsultasi/BcTiketKonsultasi";
import PageContainer from "src/components/container/PageContainer";
import KonsultasiListing from "src/components/apps/tiketKonsultasi/KonsultasiListing";
import KonsultasiFilter from "src/components/apps/tiketKonsultasi/KonsultasiFilter";
import ChildCard from "src/components/shared/ChildCard";


const TiketKonsultasiList = () => {
    return (
        <PageContainer title="Data Pengajuan Konsultasi" description="Data Pengajuan Konsultasi">
            <BcTiketKonsultasi/>
            <ChildCard>
                <KonsultasiFilter/>
                <KonsultasiListing/>
            </ChildCard>
        </PageContainer>
    );
};

export default TiketKonsultasiList;