package ir.piana.business.premierlineup.module.lineup.converters;

import ir.piana.business.premierlineup.module.auth.data.entity.UserEntity;
import ir.piana.business.premierlineup.module.lineup.models.MemberModel;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserOMemberConverter {
    MemberModel toMemberModel(UserEntity userEntity);
    List<MemberModel> toMemberModels(List<UserEntity> userEntity);
}
