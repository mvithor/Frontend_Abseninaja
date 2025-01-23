import PageContainer from "src/components/container/PageContainer";
import ChildCard from "src/components/shared/ChildCard";
import PendaftaranListing from "src/apps/super-admin/pendaftaran-sekolah/PendaftaranListing";
import PendaftaranFilter from "src/apps/super-admin/pendaftaran-sekolah/PendaftaranFilter";
import BcPendaftaranList from "src/apps/super-admin/pendaftaran-sekolah/BcPendaftaranList";

const PendaftaranSekolahList = () => {
    return (
        <PageContainer title="Data Pendaftaran Sekolah" description="Data Pendaftaran Sekolah">
            <BcPendaftaranList/>
            <ChildCard>
                <PendaftaranFilter/>
                <PendaftaranListing/>
            </ChildCard>
        </PageContainer>
    );
};

export default PendaftaranSekolahList;