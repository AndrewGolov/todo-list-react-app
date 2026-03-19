import { Button } from '../../components';
import { ImPlus, ImSearch, ImSortAlphaAsc } from 'react-icons/im';

export const RenderEditBtnBlock = ({ disabled, onAddClick, dataBase, onSearchClick, onSortHandleClick }) => {
	return (
		<div className="edit-buttons-container">
			{dataBase.length > 1 ? (
				<>
					<Button text={<ImPlus />} disabled={disabled} onClick={onAddClick} />
					<Button text={<ImSearch />} onClick={onSearchClick} />
					<Button text={<ImSortAlphaAsc />} onClick={onSortHandleClick} />
				</>
			) : (
				<>
					<Button text={<ImPlus />} disabled={disabled} onClick={onAddClick} />
				</>
			)}
		</div>
	);
};
